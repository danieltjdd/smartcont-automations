import pandas as pd
import os

def ler_planilha_entrada(caminho):
    """Lê a planilha de notas de entrada"""
    try:
        df_entrada = pd.read_excel(caminho)
        return df_entrada
    except Exception as e:
        print(f"Erro ao ler planilha de entrada: {e}")
        return None

def ler_planilha_saida(caminho):
    """Lê a planilha de notas de saída"""
    try:
        df_saida = pd.read_excel(caminho)
        return df_saida
    except Exception as e:
        print(f"Erro ao ler planilha de saída: {e}")
        return None

def processar_confronto(df_entrada, df_saida):
    """Processa o confronto entre as notas de entrada e saída"""
    # Remove duplicatas da base de saída
    ncm_saida_unicos = df_saida['NCM'].dropna().unique()
    
    # Cria lista para armazenar resultados
    resultados = []
    
    # Processa cada linha da entrada
    for _, row in df_entrada.iterrows():
        ncm = row['NCM']
        cfop = row['CFOP']
        fornecedor = row['Fornecedor']
        
        # Define a observação baseada nas regras
        if pd.isna(ncm) or ncm == '':
            observacao = "NCM não informado"
        elif ncm in ncm_saida_unicos:
            observacao = "NCM também presente nas notas de saída"
        else:
            observacao = "NCM ausente nas notas de saída"
        
        resultados.append({
            'CFOP': cfop,
            'NCM': ncm,
            'Fornecedor': fornecedor,
            'Observação': observacao
        })
    
    return pd.DataFrame(resultados)

def gerar_resumo_ausentes(df_resultado):
    """Gera um DataFrame apenas com os NCMs ausentes nas saídas, sem duplicidade"""
    ausentes = df_resultado[df_resultado['Observação'] == 'NCM ausente nas notas de saída']
    resumo = ausentes[['NCM']].drop_duplicates().reset_index(drop=True)
    return resumo

def main():
    # Caminhos dos arquivos
    entrada_path = "Notas de Entrada - Movimento do Produto - G 04.xlsx"
    saida_path = "Relação de saídas - NFC - CFE - G 03.xlsx"
    
    # Lê as planilhas
    df_entrada = ler_planilha_entrada(entrada_path)
    df_saida = ler_planilha_saida(saida_path)
    
    if df_entrada is None or df_saida is None:
        print("Não foi possível prosseguir com a análise devido a erros na leitura dos arquivos.")
        return
    
    # Processa o confronto
    df_resultado = processar_confronto(df_entrada, df_saida)
    
    # Gera resumo dos NCMs ausentes
    resumo_ausentes = gerar_resumo_ausentes(df_resultado)
    
    # Salva o resultado em duas abas
    try:
        with pd.ExcelWriter("Relatorio_Confronto_NCM.xlsx", engine="openpyxl") as writer:
            df_resultado.to_excel(writer, index=False, sheet_name="Confronto Completo")
            resumo_ausentes.to_excel(writer, index=False, sheet_name="Resumo NCMs Ausentes")
        print("Relatório gerado com sucesso!")
    except Exception as e:
        print(f"Erro ao salvar o relatório: {e}")

if __name__ == "__main__":
    main() 