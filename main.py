from fastapi import FastAPI, UploadFile, File
import pandas as pd
import re
from datetime import datetime
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Adiciona configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://www.smartcont.online",
        "https://smartcont.online",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carrega a tabela de domínio do CSV
try:
    tabela_df = pd.read_csv('SUBIR_P_DOMINIO.csv', sep=';', dtype=str, quotechar='"', encoding='utf-8')
    tabela_df.columns = [col.replace('\ufeff', '') for col in tabela_df.columns]
    print("Colunas do CSV:", tabela_df.columns)
    TABELA_DOMINIO = {}
    for _, row in tabela_df.iterrows():
        ncm = str(row['NCM']).zfill(8)
        valor = f"{row['descricao']}"
        TABELA_DOMINIO[ncm] = valor
except Exception as e:
    print("Erro ao carregar SUBIR_P_DOMINIO.csv:", e)
    TABELA_DOMINIO = {}

def formatar_ncm(ncm):
    ncm_str = re.sub(r'\D', '', str(ncm))
    ncm_str = ncm_str.zfill(8)
    if len(ncm_str) == 8:
        return f"{ncm_str[:4]}.{ncm_str[4:6]}.{ncm_str[6:]}"
    elif len(ncm_str) == 10:
        return ncm_str
    else:
        return ncm

def processar_planilhas(arquivo_usuario):
    print("Recebido arquivo para processamento")
    usuario_df = pd.read_excel(arquivo_usuario, dtype=str)
    print("Colunas do arquivo recebido:", usuario_df.columns)
    df = usuario_df.copy()
    df.columns = [col.strip() for col in df.columns]
    df['NCM'] = df['NCM'].astype(str).str.zfill(8)
    colunas_esperadas = ['Número Nota', 'Cliente', 'CNPJ/CPF', 'Descricao', 'NCM', 'Vlr. Cont.', 'Valor ICMS']
    for col in colunas_esperadas:
        if col not in df.columns:
            raise Exception(f"Coluna obrigatória não encontrada: {col}")
    df['ncm_formatado'] = df['NCM'].apply(lambda ncm: re.sub(r'\D', '', str(ncm)).zfill(8))
    df['tributacao_full'] = df['ncm_formatado'].map(TABELA_DOMINIO).fillna('')
    trib_split = df['tributacao_full'].str.split(';', n=2, expand=True)
    df['Tributação 1'] = trib_split[0].str.strip() if 0 in trib_split else ''
    df['Tributação 2'] = trib_split[1].str.strip() if 1 in trib_split else ''
    df['Tributação 3'] = trib_split[2].str.strip() if 2 in trib_split else ''
    df['Vlr. Cont.'] = pd.to_numeric(df['Vlr. Cont.'], errors='coerce').fillna(0)
    df = df.sort_values(['Tributação 1', 'Tributação 2', 'Tributação 3'])
    linhas = []
    for keys, grupo in df.groupby(['Tributação 1', 'Tributação 2', 'Tributação 3'], sort=False):
        for _, row in grupo.iterrows():
            linhas.append(row.to_dict())
        total = grupo['Vlr. Cont.'].sum()
        linha_total = {col: '' for col in df.columns}
        linha_total['Tributação 1'] = keys[0]
        linha_total['Tributação 2'] = keys[1]
        linha_total['Tributação 3'] = keys[2]
        linha_total['Vlr. Cont.'] = f"R$ {total:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
        linha_total['Descricao'] = 'TOTAL DO GRUPO'
        linhas.append(linha_total)
    colunas_finais = [
        'Número Nota', 'Cliente', 'CNPJ/CPF', 'Descricao', 'NCM', 'Vlr. Cont.', 'Valor ICMS',
        'Tributação', 'Cst de Entrada', 'Cst de Saida'
    ]
    df_organizado = pd.DataFrame(linhas, columns=df.columns)
    df_organizado = df_organizado.rename(columns={
        'Tributação 1': 'Tributação',
        'Tributação 2': 'Cst de Entrada',
        'Tributação 3': 'Cst de Saida'
    })
    for linha in linhas:
        if linha.get('Descricao') == 'TOTAL DO GRUPO':
            for col in colunas_finais:
                if col not in ['Tributação', 'Cst de Entrada', 'Cst de Saida', 'Vlr. Cont.', 'Descricao']:
                    linha[col] = ''
    df_organizado = df_organizado[colunas_finais]
    resumo = df.groupby(['Tributação 1', 'Tributação 2', 'Tributação 3'], as_index=False)['Vlr. Cont.'].sum()
    resumo['Vlr. Cont.'] = resumo['Vlr. Cont.'].apply(lambda x: f"R$ {x:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    df_organizado['__ordem__'] = df_organizado['Tributação'].apply(lambda x: 0 if str(x).strip().lower().startswith('tributado') else 1)
    df_organizado = df_organizado.sort_values(['__ordem__', 'Tributação']).drop(columns='__ordem__')

    now = datetime.now().strftime("%Y%m%d_%H%M%S")
    nome_arquivo = f"/tmp/relatorio_comparacao_{now}.xlsx"
    with pd.ExcelWriter(nome_arquivo, engine='openpyxl') as writer:
        df_organizado.to_excel(writer, sheet_name='Organizado', index=False)
        resumo.to_excel(writer, sheet_name='Resumo', index=False)
    return nome_arquivo

@app.post("/processar/")
async def processar(usuario: UploadFile = File(...)):
    try:
        nome_arquivo = processar_planilhas(usuario.file)
        return FileResponse(nome_arquivo, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename=nome_arquivo.split('/')[-1])
    except Exception as e:
        return {"erro": str(e)}

@app.get("/")
def health():
    return {"status": "ok"} 