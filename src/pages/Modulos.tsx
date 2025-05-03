import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PLANILHA_MODELO_URL = "/planilha-modelo.xlsx";

const opcoesConferencia = [
  { label: "Conferência PIS e COFINS", value: "pis_cofins" },
  { label: "Conferência NCM", value: "ncm" },
  { label: "Conferência Produto ST", value: "produto_st" },
];

const Modulos = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [opcao, setOpcao] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const [relatorioDisponivel, setRelatorioDisponivel] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
      setRelatorioDisponivel(false);
      setOpcao(null);
    }
  };

  const handleProcessar = () => {
    setProcessando(true);
    setTimeout(() => {
      setProcessando(false);
      setRelatorioDisponivel(true);
    }, 2000); // Simula processamento
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-start bg-gray-50 py-12 px-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Conferências por NCM</h2>
            <p className="mb-4 text-center text-gray-600">
              Automatize a verificação fiscal dos seus produtos com base no código NCM.
            </p>
            <a
              href={PLANILHA_MODELO_URL}
              download
              className="mb-4 w-full"
            >
              <Button className="w-full" variant="outline">📥 Baixar Planilha Modelo</Button>
            </a>
            <label className="w-full mb-4">
              <span className="block mb-2 text-sm font-medium">Upload da Planilha Preenchida</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="block w-full border border-gray-300 rounded px-3 py-2"
                onChange={handleUpload}
              />
            </label>
            {arquivo && (
              <div className="w-full mb-4">
                <span className="block mb-2 text-sm font-medium">Escolha o tipo de conferência:</span>
                <div className="flex flex-col gap-2">
                  {opcoesConferencia.map((op) => (
                    <Button
                      key={op.value}
                      variant={opcao === op.value ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setOpcao(op.value)}
                      disabled={processando}
                    >
                      {op.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {arquivo && opcao && !relatorioDisponivel && (
              <Button
                className="w-full mt-2"
                onClick={handleProcessar}
                disabled={processando}
              >
                {processando ? "Processando..." : "Processar e Gerar Relatório"}
              </Button>
            )}
            {relatorioDisponivel && (
              <div className="w-full mt-4 text-center">
                <p className="mb-2 text-green-700 font-semibold">Conferência realizada com sucesso! Faça o download do seu relatório abaixo.</p>
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <a href="/relatorio-exemplo.xlsx" download>📊 Baixar Relatório Excel</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/relatorio-exemplo.pdf" download>📄 Baixar Relatório PDF</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Modulos; 