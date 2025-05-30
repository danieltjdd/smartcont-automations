import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { processarConferencia } from '@/lib/conferencia';
import fs from 'fs';

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
    // Configura o formidable para processar o upload
    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    // Processa o upload dos arquivos
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const entradaFileRaw = files.entrada;
    const saidaFileRaw = files.saida;
    const tipoRaw = fields.tipo;

    if (!entradaFileRaw || !saidaFileRaw || !tipoRaw) {
      return res.status(400).json({ error: 'Arquivos ou tipo não fornecidos' });
    }

    const entradaFile = Array.isArray(entradaFileRaw) ? entradaFileRaw[0] : entradaFileRaw;
    const saidaFile = Array.isArray(saidaFileRaw) ? saidaFileRaw[0] : saidaFileRaw;
    const tipo = Array.isArray(tipoRaw) ? tipoRaw[0] : tipoRaw;

    if (!entradaFile || !saidaFile || !tipo) {
      return res.status(400).json({ error: 'Arquivos ou tipo inválidos' });
    }

    if (!['ncm', 'pis-cofins', 'escrituracao'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo de conferência inválido' });
    }

    // Processo dos arquivos
    const resultado = await processarConferencia(entradaFile.filepath, tipo as 'ncm' | 'pis-cofins' | 'escrituracao');

    // Configura o cabeçalho para download do arquivo
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=resultado.xlsx');

    // Envia o arquivo
    res.send(resultado);

    // Limpa os arquivos temporários
    fs.unlinkSync(entradaFile.filepath);
    fs.unlinkSync(saidaFile.filepath);
  } catch (error) {
    console.error('Erro ao processar arquivos:', error);
    res.status(500).json({ error: 'Erro ao processar arquivos' });
  }
} 