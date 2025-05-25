import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Download, FileSpreadsheet, FileSearch, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { env } from "@/config/env";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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
  const [opcao, setOpcao] = useState<'ncm' | 'pis_cofins' | 'pdf_xml' | 'conferencia_produtos' | 'produto_st' | null>(null);
  const [processando, setProcessando] = useState(false);
  const [relatorioDisponivel, setRelatorioDisponivel] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uf, setUf] = useState<string>("");
  const [tela, setTela] = useState<'modulos' | 'processamento'>('modulos');
  const [moduloSelecionado, setModuloSelecionado] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[handleUpload] Arquivos selecionados:", e.target.files);
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
      setRelatorioDisponivel(false);
      // Não resetar a opção aqui, o usuário pode querer manter a opção e trocar o arquivo
      // setOpcao(null); 
      console.log("[handleUpload] Estado 'arquivo' definido:", e.target.files[0]);
    }
  };

  const handleProcessar = async () => {
    console.log("[handleProcessar] Iniciando processamento...");
    console.log("[handleProcessar] Estado atual - Arquivo:", arquivo);
    console.log("[handleProcessar] Estado atual - Opcao:", opcao);

    if (!arquivo || !opcao) {
      console.error("[handleProcessar] ERRO: Arquivo ou opção não selecionados. Saindo.", { arquivo, opcao });
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo e uma opção de conferência antes de processar.",
        variant: "destructive"
      });
      return;
    }

    setProcessando(true);
    setRelatorioDisponivel(false);
    console.log("[handleProcessar] Estado 'processando' definido como true.");

    const formData = new FormData();
    formData.append("usuario", arquivo);
    console.log("[handleProcessar] FormData criado e arquivo adicionado:", arquivo.name);

    let endpoint = "";
    const isProd = env.isProduction();
    const appEnvValue = env.appEnv;
    const apiUrl = env.getApiUrl();

    console.log("[handleProcessar] Checando ambiente - env.isProduction():", isProd);
    console.log("[handleProcessar] Checando ambiente - env.appEnv (usado por isProduction):", appEnvValue);
    console.log("[handleProcessar] URL da API obtida (env.getApiUrl()):", apiUrl);

    if (opcao === "pis_cofins") {
      endpoint = `${apiUrl}/processar-pis-cofins/`;
    } else if (opcao === "ncm") {
      endpoint = `${apiUrl}/processar-ncm/`;
    } else if (opcao === "conferencia_produtos") {
      endpoint = `${apiUrl}/conferencia-produtos/`;
    }
    
    console.log("[handleProcessar] Opção selecionada:", opcao);
    console.log("[handleProcessar] Endpoint determinado:", endpoint);

    if (!endpoint || !apiUrl || (isProd && apiUrl.includes('localhost'))) {
      console.error("[handleProcessar] ERRO: Endpoint não pôde ser determinado ou URL da API inválida para o ambiente. Saindo.", { opcao, apiUrl, isProd, endpoint });
      toast({
        title: "Erro",
        description: `Erro ao determinar o endereço da API (${apiUrl}). Verifique as variáveis de ambiente (VITE_APP_ENV deve ser 'production', e VITE_API_URL_PRODUCTION deve ser a URL correta).`,
        variant: "destructive"
      });
      setProcessando(false);
      return;
    }

    console.log(`[handleProcessar] Tentando chamar o endpoint: ${endpoint} com método POST`);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      console.log("[handleProcessar] Resposta recebida do fetch. Status:", response.status, "Ok:", response.ok);

      if (response.ok) {
        console.log("[handleProcessar] Resposta OK. Processando blob...");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const disposition = response.headers.get('content-disposition');
        let filename = 'relatorio.xlsx'; 
        console.log("[handleProcessar] Content-Disposition header:", disposition);
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((["']).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/["']/g, '');
            console.log("[handleProcessar] Nome do arquivo extraído do header:", filename);
          }
        }
        a.download = filename;
        console.log("[handleProcessar] Iniciando download do arquivo:", filename);
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setRelatorioDisponivel(true);
        console.log("[handleProcessar] Download concluído e 'relatorioDisponivel' definido como true.");
        
        toast({
          title: "Sucesso",
          description: "Relatório gerado com sucesso!",
          variant: "default"
        });
      } else {
        const errorText = await response.text();
        console.error("[handleProcessar] ERRO na API - Status:", response.status, "Resposta:", errorText);
        try {
            const errorData = JSON.parse(errorText);
          toast({
            title: "Erro",
            description: `Erro ao processar arquivo (${response.status}): ${errorData.erro || errorData.detail || response.statusText}`,
            variant: "destructive"
          });
        } catch (e) {
          toast({
            title: "Erro",
            description: `Erro ao processar arquivo (${response.status}): ${response.statusText}. Detalhes: ${errorText.substring(0, 300)}`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("[handleProcessar] ERRO CATCH na requisição:", error);
      toast({
        title: "Erro",
        description: `Erro crítico na requisição: ${error.message || error}`,
        variant: "destructive"
      });
    } finally {
      setProcessando(false);
      console.log("[handleProcessar] Estado 'processando' definido como false. Finalizando handleProcessar.");
    }
  };

  // Renderiza a tela de módulos disponíveis
  const renderModulosDisponiveis = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Módulos</h1>
        <p className="text-xl text-muted-foreground">
          Escolha o módulo que deseja utilizar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conferência de NCM</CardTitle>
            <CardDescription>
              Verifique a consistência dos códigos NCM em suas notas fiscais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/modulos/conferencia-ncm">
              <Button className="w-full">
                Acessar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conferência de PIS/COFINS</CardTitle>
            <CardDescription>
              Analise as operações com PIS/COFINS em suas notas fiscais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/modulos/conferencia-pis-cofins">
              <Button className="w-full">
                Acessar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conferência de Escrituração</CardTitle>
            <CardDescription>
              Verifique a consistência da escrituração contábil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/modulos/conferencia-escrituracao">
              <Button className="w-full">
                Acessar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex flex-col items-start justify-start py-10 px-8 max-w-7xl mx-auto">
        {tela === 'modulos' ? (
          renderModulosDisponiveis()
        ) : (
          <div className="w-full">
            <Button variant="outline" className="mb-6" onClick={() => { setTela('modulos'); setArquivo(null); setOpcao(null); setRelatorioDisponivel(false); }}>
              ← Voltar para módulos disponíveis
            </Button>
            <h1 className="text-3xl font-bold mb-6 text-smartcont-700">
              {opcao === 'ncm' ? 'Conferência de NCM' : 
               opcao === 'pis_cofins' ? 'Tributação PIS/COFINS' : 
               opcao === 'conferencia_produtos' ? 'Conferência de Produtos para Escrituração' :
               'Conversor de PDF para XML'}
            </h1>
            <div className="flex flex-col gap-8 w-full">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-base font-medium shadow-sm rounded-lg"
                  asChild
                >
                  <a href={PLANILHA_MODELO_URL} download>
                    <Download className="w-5 h-5" /> Baixar Planilha Modelo
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-base font-medium shadow-sm rounded-lg"
                  asChild
                >
                  <a href={PLANILHA_MODELO_URL} target="_blank" rel="noopener noreferrer">
                    Pré-visualizar Planilha
                  </a>
                </Button>
              </div>
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
              {opcao === 'produto_st' && (
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
                  {/* O botão de download real é criado dinamicamente em handleProcessar */}
                </div>
              )}
            </div>
          </div>
        )}
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

