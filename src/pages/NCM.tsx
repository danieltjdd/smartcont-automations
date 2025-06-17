import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardLayout from "@/components/DashboardLayout";
import { Target, Upload, Download, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const NCM = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [results, setResults] = useState<any>({
    summary: {
      correct: 0,
      suggestions: 0,
      errors: 0
    },
    issues: []
  });
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults({
        summary: {
          correct: 0,
          suggestions: 0,
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
    setStatus("Enviando arquivo...");

    const formData = new FormData();
    formData.append("usuario", file); // <-- CORRIGIDO
    formData.append("user_id", (user && user.uid) ? user.uid : "anonimo");

    const response = await fetch("https://api-smartcont.onrender.com/ncm/enfileirar", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setTaskId(data.task_id);
    setStatus("Aguardando processamento...");
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!taskId) return;
    const unsub = onSnapshot(doc(db, "ncm_tasks", taskId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStatus(data.status);
        if (data.status === "concluido" && data.result_path) {
          setDownloadUrl(`https://api-smartcont.onrender.com/ncm/download/${taskId}`);
          toast({
            title: "Processamento concluído!",
            description: "Sua planilha de NCM está pronta para download.",
          });
        }
        if (data.status === "erro") {
          toast({
            title: "Erro no processamento",
            description: data.error_message || "Ocorreu um erro ao processar sua planilha.",
            variant: "destructive",
          });
        }
      }
    });
    return () => unsub();
  }, [taskId]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-smartcont-600">Conferência de NCM</h1>
            <p className="text-gray-600 mt-1">
              Automatização da análise e validação de NCM, evitando problemas fiscais
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
                  Faça o upload do arquivo com os produtos e códigos NCM para validação
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
                      <Target className="mr-2 h-5 w-5" />
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
                    Análise concluída. Veja os resultados e sugestões abaixo.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Resumo */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{results.summary.correct}</div>
                      <div className="text-sm text-green-700">NCMs Corretos</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-600">{results.summary.suggestions}</div>
                      <div className="text-sm text-yellow-700">Sugestões</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-600">{results.summary.errors}</div>
                      <div className="text-sm text-red-700">NCMs Incorretos</div>
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
                          <div>
                            <strong>Produto:</strong> {issue.product}<br />
                            <strong>NCM Atual:</strong> {issue.currentNCM}<br />
                            <strong>Sugestão:</strong> {issue.suggestion}<br />
                            <span className="text-sm text-gray-600">{issue.reason}</span>
                          </div>
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

            {status && <p>Status: {status}</p>}
            {downloadUrl && (
              <a
                href={downloadUrl}
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                download
              >
                Baixar arquivo corrigido
              </a>
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
                    <p className="text-sm">Envie planilha com produtos e códigos NCM</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-smartcont-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-sm">IA analisa cada produto e verifica NCM mais adequado</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-smartcont-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <p className="text-sm">Receba sugestões de correção e justificativas</p>
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
                    <span>Formato do código NCM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Correspondência produto vs NCM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Validação na tabela TIPI</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Sugestões de NCM similares</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Análise de impostos aplicáveis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-smartcont-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-smartcont-600 mb-2">Consumo de Créditos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Esta conferência consumirá <strong>1 crédito</strong> do seu plano.
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

export default NCM;
