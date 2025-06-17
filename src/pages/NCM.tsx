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
    formData.append("usuario", file); // <-- CORRIGIDO AQUI
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
      {/* ...restante do seu JSX permanece igual... */}
    </DashboardLayout>
  );
};

export default NCM;
