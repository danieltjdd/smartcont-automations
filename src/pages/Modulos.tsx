import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Download, FileSpreadsheet, FileSearch, ShieldCheck, MapPin } from "lucide-react";

const PLANILHA_MODELO_URL = "/planilha-modelo.xlsx";
const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const opcoesConferencia = [
  {
    label: "Conferência de PIS/COFINS",
    value: "pis_cofins",
    icon: <FileSpreadsheet className="w-6 h-6 mr-2" />,
    desc: "Gere uma planilha com os CST de PIS e COFINS, auxiliando na conferência tributária dos produtos."
  },
  {
    label: "Conferência de NCM",
    value: "ncm",
    icon: <FileSearch className="w-6 h-6 mr-2" />,
    desc: "Auxilia na classificação correta do NCM com apoio de IA. Verifica o CST informado, compara com a nomenclatura oficial e sugere correções. Ideal para revisar o cadastro de produtos e corrigir inconsistências no sistema fiscal."
  },
  {
    label: "Conferência Produto ST",
    value: "produto_st",
    icon: <ShieldCheck className="w-6 h-6 mr-2" />,
    desc: "Verifique se o CFOP foi utilizado corretamente de acordo com o Estado de destino/origem."
  }
];

const PlanilhaPreview = () => (
  <div className="bg-white border border-gray-200 rounded shadow p-4 text-xs max-w-full overflow-x-auto" style={{ minWidth: 400 }}>
    <table className="min-w-max w-full text-left">
      <thead>
        <tr>
          <th>Cód. Saída</th>
          <th>Número Nota</th>
          <th>Emissão</th>
          <th>Vlr. Cont.</th>
          <th>Cliente</th>
          <th>CNPJ/CPF</th>
          <th>Código Produto</th>
          <th>Descricao</th>
          <th>NCM</th>
          <th>CFOP</th>
          <th>CST/CSON</th>
          <th>Sujeito Trib. PIS/COFINS</th>
          <th>Incidência PIS/COFINS</th>
          <th>Unidade</th>
          <th>Qtd.</th>
          <th>Vlr. Total</th>
          <th>Vlr. Cont.</th>
          <th>Base PIS</th>
          <th>Valor PIS</th>
          <th>Base COFINS</th>
          <th>Valor COFINS</th>
          <th>Base SUBTR</th>
          <th>Valor SUBTR</th>
          <th>Base ICMS</th>
          <th>Alíquota ICMS</th>
          <th>Valor ICMS</th>
          <th>Valor Desconto</th>
          <th>Valor Cancel.</th>
          <th>Tipo</th>
          <th>Chave</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-50">
          <td>1001</td><td>12345</td><td>01/05/2024</td><td>1500,00</td><td>Empresa Exemplo</td><td>12.345.678/0001-99</td><td>001</td><td>Produto A</td><td>12345678</td><td>5102</td><td>101</td><td>Sim</td><td>Não cumulativo</td><td>UN</td><td>10</td><td>1500,00</td><td>1500,00</td><td>1000,00</td><td>65,00</td><td>1000,00</td><td>65,00</td><td>0,00</td><td>0,00</td><td>1000,00</td><td>18%</td><td>180,00</td><td>0,00</td><td>0,00</td><td>Venda</td><td>1234567890</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Modulos = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [opcao, setOpcao] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const [relatorioDisponivel, setRelatorioDisponivel] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uf, setUf] = useState<string>("");

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex flex-col items-start justify-start py-10 px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-smartcont-700">Conferências por NCM e Tributações</h1>
        <div className="flex flex-col gap-8 w-full">
          {/* Baixar planilha modelo */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-base font-medium shadow-sm rounded-lg"
              onMouseEnter={() => setShowPreview(true)}
              onMouseLeave={() => setShowPreview(false)}
              asChild
            >
              <a href={PLANILHA_MODELO_URL} download>
                <Download className="w-5 h-5" /> Baixar Planilha Modelo
              </a>
            </Button>
            {showPreview && <PlanilhaPreview />}
          </div>

          {/* Upload da planilha */}
          <div className="flex flex-col gap-2 w-full max-w-lg">
            <label className="font-semibold text-sm">Upload da Planilha do Cliente</label>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="block w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleUpload}
            />
            <span className="text-xs text-gray-500">Faça upload da planilha preenchida conforme o modelo.</span>
          </div>

          {/* Opções de conferência */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {opcoesConferencia.map((op) => (
              <div
                key={op.value}
                className={`bg-white rounded-xl shadow-md p-6 flex flex-col items-start border transition-all ${opcao === op.value ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"}`}
              >
                <button
                  className="flex items-center text-lg font-semibold mb-2 w-full hover:text-blue-700 focus:outline-none"
                  onClick={() => setOpcao(op.value)}
                  disabled={processando}
                >
                  {op.icon} {op.label}
                </button>
                <span className="text-sm text-gray-600 mb-2 block">{op.desc}</span>
                {op.value === "produto_st" && opcao === "produto_st" && (
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      value={uf}
                      onChange={e => setUf(e.target.value)}
                    >
                      <option value="">Selecione o Estado (UF)</option>
                      {UFS.map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Botão de processar e download do relatório */}
          {arquivo && opcao && (opcao !== "produto_st" || (opcao === "produto_st" && uf)) && !relatorioDisponivel && (
            <Button
              className="mt-4"
              onClick={handleProcessar}
              disabled={processando}
            >
              {processando ? "Processando..." : "Processar e Gerar Relatório"}
            </Button>
          )}
          {relatorioDisponivel && (
            <div className="mt-4 text-left">
              <p className="mb-2 text-green-700 font-semibold">Conferência realizada com sucesso! Faça o download do seu relatório abaixo.</p>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <a href="/relatorio-exemplo.xlsx" download>📊 Baixar Relatório Excel</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/relatorio-exemplo.pdf" download>📄 Baixar Relatório PDF</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Rodapé compacto */}
      <footer className="w-full bg-gray-100 border-t border-gray-200 py-2 px-8 flex justify-between items-center text-xs text-gray-600">
        <span>SmartCont © {new Date().getFullYear()}</span>
        <span>Contato: contato@smartcont.com.br</span>
      </footer>
    </div>
  );
};

export default Modulos; 