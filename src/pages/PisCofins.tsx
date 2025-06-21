import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardLayout from "@/components/DashboardLayout";
import { Calculator, Upload, Download, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PisCofins = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [results, setResults] = useState<any>({
    summary: {
      correct: 0,
      warnings: 0,
      errors: 0
    },
    issues: []
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults({
        summary: {
          correct: 0,
          warnings: 0,
          errors: 0
        },
        issues: []
      });
    }
  };

  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo para processar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    // Estimativa baseada no tamanho do arquivo (1MB = ~30 segundos)
    const estimatedSeconds = Math.ceil((file.size / (1024 * 1024)) * 30);
    setEstimatedTime(estimatedSeconds);
    
    try {
      const formData = new FormData();
      formData.append("usuario", file);
      formData.append("service_tier", "flex"); // Adicionando o parâmetro para economia

      const response = await fetch("/api/processar-pis-cofins/", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.erro || "Erro ao processar arquivo");
      }

      // Recebe o arquivo como blob
      const blob = await response.blob();
      
      // Cria um link temporário para download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio_pis_cofins_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Processamento concluído",
        description: "A conferência de PIS/COFINS foi concluída com sucesso.",
      });

      setResults({
        status: "success",
        message: "Arquivo processado com sucesso",
        summary: {
          correct: 0,
          warnings: 0,
          errors: 0
        },
        issues: []
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao processar o arquivo. Tente novamente.",
        variant: "destructive",
      });
      setResults({
        status: "error",
        message: "Erro ao processar arquivo",
        summary: {
          correct: 0,
          warnings: 0,
          errors: 0
        },
        issues: []
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-smartcont-600">Conferência de PIS/COFINS</h1>
            <p className="text-gray-600 mt-1">
              Análise automática e diagnóstico completo da tributação de PIS/COFINS
            </p>
          </div>
        </div>

        <div className="mb-4">
          <a href="/planilha-modelo.xlsx" download className="inline-block px-4 py-2 bg-smartcont-600 text-white rounded hover:bg-smartcont-700 transition">
            Baixar planilha de exemplo
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload e Processamento */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload do Arquivo</span>
                </CardTitle>
                <CardDescription>
                  Faça o upload do arquivo Excel/CSV com os dados de PIS/COFINS para análise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="file">Selecionar Arquivo</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500">
                    Formatos aceitos: Excel (.xlsx, .xls) ou CSV
                  </p>
                </div>

                {file && (
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Arquivo selecionado: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleProcess} 
                  disabled={!file || isProcessing}
                  className="w-full bg-smartcont-600 hover:bg-smartcont-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="mr-2 h-5 w-5 animate-spin" />
                      Processando... (Tempo estimado: {Math.ceil(estimatedTime / 60)} min)
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-5 w-5" />
                      Iniciar Conferência
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Resultados */}
            {results && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Resultados da Conferência</span>
                  </CardTitle>
                  <CardDescription>
                    Análise concluída. Veja os resultados abaixo.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Resumo */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{results.summary.correct}</div>
                      <div className="text-sm text-green-700">Registros Corretos</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-600">{results.summary.warnings}</div>
                      <div className="text-sm text-yellow-700">Alertas</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-600">{results.summary.errors}</div>
                      <div className="text-sm text-red-700">Erros Críticos</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Lista de Issues */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-smartcont-600">Detalhes dos Problemas Encontrados</h3>
                    {results.issues.map((issue: any, index: number) => (
                      <Alert key={index} className={issue.type === 'error' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}>
                        <AlertCircle className={`h-4 w-4 ${issue.type === 'error' ? 'text-red-600' : 'text-yellow-600'}`} />
                        <AlertDescription>
                          <strong>Linha {issue.line}:</strong> {issue.message}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>

                  <Separator />

                  {/* Ações */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar Excel
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Exportar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Informações Laterais */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-smartcont-600">Como Funciona</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-smartcont-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-sm">Faça upload do arquivo Excel ou CSV com dados de PIS/COFINS</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-smartcont-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-sm">Nossa IA analisa cada registro verificando conformidade</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-smartcont-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <p className="text-sm">Receba relatório detalhado com problemas e sugestões</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-smartcont-600">Validações Realizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Alíquotas de PIS/COFINS</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Bases de cálculo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>CST de PIS e COFINS</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Créditos presumidos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Regime de tributação</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-smartcont-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-smartcont-600 mb-2">Consumo de Créditos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Esta conferência consumirá <strong>2 créditos</strong> do seu plano.
                  </p>
                  <p className="text-xs text-gray-500">
                    Créditos restantes: <strong>48</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Mock data for demonstration
const mockResults = {
  summary: {
    correct: 1247,
    warnings: 23,
    errors: 8
  },
  issues: [
    {
      line: 45,
      type: 'error',
      message: 'Alíquota de PIS incorreta para este CST. Esperado: 1,65%, Encontrado: 0,65%'
    },
    {
      line: 78,
      type: 'warning', 
      message: 'Base de cálculo de COFINS pode estar incorreta. Verifique o valor informado.'
    },
    {
      line: 156,
      type: 'error',
      message: 'CST de PIS inválido (99). CSTs válidos: 01, 02, 03, 04, 05, 06, 07, 08, 09'
    }
  ]
};

export default PisCofins;
