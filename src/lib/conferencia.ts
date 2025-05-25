import pandas from 'pandas-js';
import ExcelJS from 'exceljs';

interface ResultadoConferencia {
  CFOP: string;
  NCM: string;
  Fornecedor: string;
  Observação: string;
}

export async function processarConferencia(
  arquivo: string,
  tipo: 'ncm' | 'pis-cofins' | 'escrituracao'
): Promise<ResultadoConferencia[]> {
  try {
    // Lê o arquivo Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(arquivo);
    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      throw new Error('Planilha não encontrada no arquivo Excel');
    }

    // Converte para DataFrame
    const rows = worksheet.getRows();
    if (!rows || rows.length === 0) {
      throw new Error('Nenhuma linha encontrada na planilha');
    }

    const data = rows.map(row => ({
      CFOP: String(row.getCell(1).value || ''),
      NCM: String(row.getCell(2).value || ''),
      Fornecedor: String(row.getCell(3).value || ''),
      Observação: String(row.getCell(4).value || '')
    }));

    const df = new pandas.DataFrame(data);

    // Processa de acordo com o tipo
    const resultados: ResultadoConferencia[] = [];

    if (tipo === 'ncm') {
      // Lógica para conferência de NCM
      for (let i = 0; i < df.length; i++) {
        const cfop = String(df.get('CFOP', i) || '');
        const ncm = String(df.get('NCM', i) || '');
        const fornecedor = String(df.get('Fornecedor', i) || '');

        // Aqui você pode adicionar sua lógica de validação
        if (!ncm || ncm.length !== 8) {
          resultados.push({
            CFOP: cfop,
            NCM: ncm,
            Fornecedor: fornecedor,
            Observação: 'NCM inválido'
          });
        }
      }
    } else if (tipo === 'pis-cofins') {
      // Lógica para conferência de PIS/COFINS
      for (let i = 0; i < df.length; i++) {
        const cfop = String(df.get('CFOP', i) || '');
        const ncm = String(df.get('NCM', i) || '');
        const fornecedor = String(df.get('Fornecedor', i) || '');

        // Aqui você pode adicionar sua lógica de validação
        if (cfop && cfop.startsWith('5')) {
          resultados.push({
            CFOP: cfop,
            NCM: ncm,
            Fornecedor: fornecedor,
            Observação: 'Operação com PIS/COFINS'
          });
        }
      }
    } else if (tipo === 'escrituracao') {
      // Lógica para conferência de escrituração
      for (let i = 0; i < df.length; i++) {
        const cfop = String(df.get('CFOP', i) || '');
        const ncm = String(df.get('NCM', i) || '');
        const fornecedor = String(df.get('Fornecedor', i) || '');

        // Aqui você pode adicionar sua lógica de validação
        if (!cfop) {
          resultados.push({
            CFOP: cfop,
            NCM: ncm,
            Fornecedor: fornecedor,
            Observação: 'CFOP não informado'
          });
        }
      }
    }

    return resultados;
  } catch (error) {
    console.error('Erro ao processar conferência:', error);
    throw error;
  }
} 