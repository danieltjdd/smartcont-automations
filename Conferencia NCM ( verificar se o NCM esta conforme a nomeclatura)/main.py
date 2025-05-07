from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import openai
import pandas as pd
import os
import json
import re
import time
from typing import List, Dict
from datetime import datetime

app = FastAPI()

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, você deve especificar os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def processar_lote(descricoes: List[str], api_key: str, modelo: str) -> List[Dict]:
    prompt = """
    Você é um especialista tributário. Para cada descrição de produto abaixo, sugira o código NCM mais adequado segundo a tabela NCM brasileira:

    """
    for i, desc in enumerate(descricoes):
        prompt += f"{i+1}. {desc}\n"

    prompt += """

    Retorne a resposta em formato JSON com a estrutura:
    [
      {"input": "Descrição do Produto", "ncm": "00000000", "descricao": "Descrição Sugerida"},
      ...
    ]
    """

    openai.api_key = api_key
    response = openai.ChatCompletion.create(
        model=modelo,
        messages=[
            {"role": "system", "content": "Você é um especialista tributário brasileiro."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    conteudo = response['choices'][0]['message']['content']
    print("\nResposta recebida da API:")
    print(conteudo)
    
    conteudo_limpo = re.sub(r'^```json\s*|\s*```$', '', conteudo.strip())
    return json.loads(conteudo_limpo)

try:
    # CONFIGURAÇÕES GERAIS
    CAMINHO_PLANILHA_USUARIO = 'entrada/planilha_usuario.xlsx'
    CAMINHO_TABELA_NCM = 'entrada/Tabela_NCM_Vigente.xlsx'
    CAMINHO_SAIDA = 'saida/resultado_validado.xlsx'
    OPENAI_API_KEY = 'OPENAI_API_KEY'  # Substitua pelo seu token da OpenAI
    MODELO = 'gpt-3.5-turbo'  # Alterado para usar o modelo mais econômico
    TAMANHO_LOTE = 10  # Número de itens por lote
    TEMPO_ESPERA = 21  # Tempo de espera em segundos entre as requisições

    # Carrega as planilhas
    print("Carregando planilhas...")
    df_usuario = pd.read_excel(CAMINHO_PLANILHA_USUARIO)
    print("Planilha do usuário carregada com sucesso!")
    print("Colunas encontradas:", df_usuario.columns.tolist())
    
    df_tabela_ncm = pd.read_excel(CAMINHO_TABELA_NCM)
    print("Tabela NCM carregada com sucesso!")
    print("Colunas encontradas:", df_tabela_ncm.columns.tolist())

    # Seleciona apenas as colunas necessárias
    print("\nSelecionando colunas necessárias...")
    df_usuario_simplificado = df_usuario[['NCM', 'Descricao']].copy()
    df_usuario_simplificado.columns = ['NCM Usuário', 'Descrição Usuário']

    # Remove duplicatas
    df_unicos = df_usuario_simplificado.drop_duplicates(subset=['NCM Usuário', 'Descrição Usuário'])
    print(f"Encontrados {len(df_unicos)} registros únicos para análise.")

    # Processa em lotes
    todas_respostas = []
    lote_descricoes = df_unicos['Descrição Usuário'].tolist()
    
    for i in range(0, len(lote_descricoes), TAMANHO_LOTE):
        print(f"\nProcessando lote {i//TAMANHO_LOTE + 1} de {(len(lote_descricoes) + TAMANHO_LOTE - 1)//TAMANHO_LOTE}")
        lote_atual = lote_descricoes[i:i + TAMANHO_LOTE]
        
        # Tenta processar o lote com retry em caso de erro de limite de taxa
        max_tentativas = 3
        tentativa = 0
        while tentativa < max_tentativas:
            try:
                respostas_lote = processar_lote(lote_atual, OPENAI_API_KEY, MODELO)
                todas_respostas.extend(respostas_lote)
                break
            except openai.error.RateLimitError:
                tentativa += 1
                if tentativa < max_tentativas:
                    print(f"\nLimite de taxa atingido. Aguardando {TEMPO_ESPERA} segundos antes de tentar novamente...")
                    time.sleep(TEMPO_ESPERA)
                else:
                    raise
            
        # Aguarda entre os lotes para evitar limite de taxa
        if i + TAMANHO_LOTE < len(lote_descricoes):
            print(f"\nAguardando {TEMPO_ESPERA} segundos antes do próximo lote...")
            time.sleep(TEMPO_ESPERA)

    # Cria DataFrame com todas as respostas
    df_resposta = pd.DataFrame(todas_respostas)
    df_resposta.columns = ['Descrição Usuário', 'NCM IA', 'Descrição IA']

    # Junta tudo
    resultado = pd.merge(df_usuario_simplificado, df_tabela_ncm, how='left', left_on='NCM Usuário', right_on='Código')
    resultado = pd.merge(resultado, df_resposta, on='Descrição Usuário', how='left')

    # Cria coluna de observação
    def gerar_observacao(row):
        if str(row['NCM Usuário']) == str(row['NCM IA']):
            return 'OK'
        return '⚠ Atenção: NCM pode estar incorreto'

    resultado['Observação'] = resultado.apply(gerar_observacao, axis=1)

    # Salva resultado final
    print("\nSalvando resultado...")
    os.makedirs(os.path.dirname(CAMINHO_SAIDA), exist_ok=True)
    resultado.to_excel(CAMINHO_SAIDA, index=False)

    print("Validação concluída com sucesso. Arquivo salvo em:", CAMINHO_SAIDA)

except Exception as e:
    print("\nOcorreu um erro durante a execução:")
    print(f"Tipo do erro: {type(e).__name__}")
    print(f"Descrição do erro: {str(e)}")
    import traceback
    print("\nDetalhes do erro:")
    print(traceback.format_exc()) 