import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { processarConferencia } from '@/lib/conferencia';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const form = formidable({ multiples: true });
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const entradaFile = files.entrada as formidable.File;
    const saidaFile = files.saida as formidable.File;

    if (!entradaFile || !saidaFile) {
      return res.status(400).json({ error: 'Arquivos não fornecidos' });
    }

    // Processa os arquivos
    const resultado = await processarConferencia(entradaFile.filepath, saidaFile.filepath);

    // Configura o cabeçalho para download do arquivo
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Relatorio_Confronto_NCM.xlsx');

    // Envia o arquivo
    res.send(resultado);

    // Limpa os arquivos temporários
    await Promise.all([
      fs.unlink(entradaFile.filepath),
      fs.unlink(saidaFile.filepath),
    ]);
  } catch (error) {
    console.error('Erro ao processar arquivos:', error);
    res.status(500).json({ error: 'Erro ao processar arquivos' });
  }
} 