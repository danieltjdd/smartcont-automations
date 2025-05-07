import pandas as pd

# Caminhos dos arquivos
CAMINHO_PLANILHA_USUARIO = 'entrada/planilha_usuario.xlsx'
CAMINHO_TABELA_NCM = 'entrada/Tabela_NCM_Vigente.xlsx'

# Lê a planilha do usuário
print('Lendo planilha do usuário...')
df_usuario = pd.read_excel(CAMINHO_PLANILHA_USUARIO)
print('Colunas encontradas na planilha do usuário:', df_usuario.columns.tolist())

# Seleciona as colunas NCM e Descricao
if 'NCM' in df_usuario.columns and 'Descricao' in df_usuario.columns:
    print(df_usuario[['NCM', 'Descricao']].head())
else:
    print('Colunas NCM e/ou Descricao não encontradas na planilha do usuário.')

# Lê a planilha oficial
print('\nLendo planilha oficial...')
df_oficial = pd.read_excel(CAMINHO_TABELA_NCM)
print('Colunas encontradas na planilha oficial:', df_oficial.columns.tolist())

# Tenta selecionar as colunas Codigo e Descricao
if 'Codigo' in df_oficial.columns and 'Descricao' in df_oficial.columns:
    print(df_oficial[['Codigo', 'Descricao']].head())
else:
    print('Colunas Codigo e/ou Descricao não encontradas na planilha oficial.')
    # Mostra as 5 primeiras linhas para inspeção manual
    print(df_oficial.head()) 