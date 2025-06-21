import React from "react";
import { Button } from "@/components/ui/button";

const AnalistaPro: React.FC = () => {
  const executarTarefas = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/executar-tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      alert(data.mensagem);
    } catch (error) {
      alert("Erro ao executar tarefas!");
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Analista PRO</h1>
      <div style={{ marginTop: 24 }}>
        <Button
          variant="default"
          style={{ marginRight: 16 }}
          onClick={() => alert("Em breve: Central de Dúvidas!")}
        >
          Dúvidas
        </Button>
        <Button
          variant="secondary"
          onClick={executarTarefas}
        >
          Executar Tarefas
        </Button>
      </div>
    </div>
  );
};

export default AnalistaPro; 