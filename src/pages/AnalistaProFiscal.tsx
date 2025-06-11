import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AnalistaProFiscal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const usuario_id = user?.email || "visitante";

  const handleAcessarDominio = async () => {
    try {
      // Buscar credenciais salvas do backend
      const credRes = await fetch(`http://localhost:8000/api/analista-pro/credenciais/${usuario_id}`);
      const credData = await credRes.json();
      const cred = credData.credenciais || {};

      // Montar o JSON completo
      const body = {
        sistema: "sistema dominio",
        tipo: "web",
        usuario_id,
        email: cred.email || "",
        senha_web: cred.senha_web || "",
        usuario: cred.usuario || "",
        senha: cred.senha || "",
        salvar: false,
        autoriza: true
      };

      const response = await fetch("http://localhost:8000/api/analista-pro/execucao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("Resposta:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleCadastroEmpresas = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rodar-microagente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id,
          tipo: "web"
        }),
      });
      const data = await response.json();
      console.log("Resposta:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleEmpresasCadastradas = () => {
    navigate("/dashboard/analista-pro/empresas");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto mt-10 p-8 bg-white shadow-md rounded-2xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Módulo Fiscal
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Acessar Domínio */}
          <div 
            className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={handleAcessarDominio}
          >
            <div className="text-4xl mb-4 text-center">🌐</div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">
              Acessar Domínio
            </h2>
            <p className="text-gray-600 text-center">
              Acesse o sistema Domínio Web para gerenciar suas rotinas fiscais
            </p>
          </div>

          {/* Card Cadastro de Empresas */}
          <div 
            className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={handleCadastroEmpresas}
          >
            <div className="text-4xl mb-4 text-center">📝</div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">
              Cadastro de Empresas
            </h2>
            <p className="text-gray-600 text-center">
              Cadastre novas empresas no sistema Domínio
            </p>
          </div>

          {/* Card Empresas Cadastradas */}
          <div 
            className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={handleEmpresasCadastradas}
          >
            <div className="text-4xl mb-4 text-center">📋</div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">
              Empresas Cadastradas
            </h2>
            <p className="text-gray-600 text-center">
              Visualize e gerencie suas empresas cadastradas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalistaProFiscal; 