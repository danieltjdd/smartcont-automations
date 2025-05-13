import pandas from 'pandas-js';
import ExcelJS from 'exceljs';

export async function processarConferencia(
  entradaPath: string,
  saidaPath: string
): Promise<Buffer> {
  try {
    // Lê as planilhas
    const df_entrada = await pandas.read_excel(entradaPath);
    const df_saida = await pandas.read_excel(saidaPath);

    // Remove duplicatas da base de saída
    const ncm_saida_unicos = df_saida['NCM'].dropna().unique();

    // Cria lista para armazenar resultados
    const resultados = [];

    // Processa cada linha da entrada
    for (const row of df_entrada.iterrows()) {
      const ncm = row['NCM'];
      const cfop = row['CFOP'];
      const fornecedor = row['Fornecedor'];

      // Define a observação baseada nas regras
      let observacao;
      if (!ncm || ncm === '') {
        observacao = "NCM não informado";
      } else if (ncm_saida_unicos.includes(ncm)) {
        observacao = "NCM também presente nas notas de saída";
      } else {
        observacao = "NCM ausente nas notas de saída";
      }

      resultados.push({
        CFOP: cfop,
        NCM: ncm,
        Fornecedor: fornecedor,
        Observação: observacao
      });
    }

    // Gera resumo dos NCMs ausentes
    const ausentes = resultados.filter(r => r['Observação'] === 'NCM ausente nas notas de saída');
    const resumo = [...new Set(ausentes.map(r => r['NCM']))].map(ncm => ({ NCM: ncm }));

    // Cria o arquivo Excel
    const workbook = new ExcelJS.Workbook();
    
    // Adiciona a aba de confronto completo
    const sheet1 = workbook.addWorksheet('Confronto Completo');
    sheet1.columns = [
      { header: 'CFOP', key: 'CFOP' },
      { header: 'NCM', key: 'NCM' },
      { header: 'Fornecedor', key: 'Fornecedor' },
      { header: 'Observação', key: 'Observação' }
    ];
    sheet1.addRows(resultados);

    // Adiciona a aba de resumo
    const sheet2 = workbook.addWorksheet('Resumo NCMs Ausentes');
    sheet2.columns = [
      { header: 'NCM', key: 'NCM' }
    ];
    sheet2.addRows(resumo);

    // Gera o buffer do arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error('Erro ao processar conferência:', error);
    throw new Error('Erro ao processar conferência');
  }
} 