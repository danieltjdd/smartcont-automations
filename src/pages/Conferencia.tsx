import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const Conferencia = () => {
  const [entradaFile, setEntradaFile] = useState<File | null>(null);
  const [saidaFile, setSaidaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEntradaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEntradaFile(e.target.files[0]);
    }
  };

  const handleSaidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSaidaFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!entradaFile || !saidaFile) {
      toast({
        title: "Erro",
        description: "Por favor, selecione ambos os arquivos",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("entrada", entradaFile);
      formData.append("saida", saidaFile);

      const response = await fetch("/api/conferencia", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao processar arquivos");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Relatorio_Confronto_NCM.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Sucesso",
        description: "Relatório gerado com sucesso!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao gerar relatório",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4 max-w-2xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-smartcont-700">Conferência de NCM</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Planilha de Entrada
                </label>
                <Input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleEntradaChange}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Selecione o arquivo de notas de entrada
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Planilha de Saída
                </label>
                <Input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleSaidaChange}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Selecione o arquivo de notas de saída
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !entradaFile || !saidaFile}
            >
              {loading ? "Processando..." : "Gerar Relatório"}
            </Button>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Conferencia; 