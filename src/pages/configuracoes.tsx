import React, { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Configuracoes: React.FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [showToken, setShowToken] = useState(false);
  const [token] = useState("sk-xxxx-xxxx-xxxx"); // Simulação
  const [creditos] = useState(100); // Simulação

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Configurações</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Alterar senha</h3>
          <Button variant="outline">Redefinir senha</Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Preferências de notificação</h3>
          <p className="text-sm text-gray-500">(Em breve)</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Token/API</h3>
          <Button variant="outline" onClick={() => setShowToken(!showToken)}>
            {showToken ? "Ocultar Token" : "Mostrar Token"}
          </Button>
          {showToken && <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono">{token}</div>}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Pagamento</h3>
          <Button variant="outline">Ver opções de pagamento</Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Créditos</h3>
          <div className="mb-2">Créditos disponíveis: <span className="font-bold">{creditos}</span></div>
          <Button variant="outline">Adicionar créditos</Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-red-600">Excluir conta</h3>
          <Button variant="destructive">Excluir minha conta</Button>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes; 