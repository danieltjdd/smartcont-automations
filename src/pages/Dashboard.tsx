import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (!user) {
    return <div>Usuário não autenticado</div>;
  }

  const nome = user.displayName || user.email || "Usuário";

  const handleModuleSelection = (moduleId: string) => {
    setActiveModule(moduleId);
    toast({
      title: "Módulo selecionado",
      description: `O módulo ${moduleId} será implementado em uma etapa futura.`
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-smartcont-600 text-white">
        <div className="flex items-center h-16 px-6 border-b border-smartcont-500">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-smartcont-600 font-bold text-base">
              SC
            </div>
            <span className="font-bold text-lg">SmartCont</span>
          </Link>
        </div>
        <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
          <div className="px-4 pb-2">
            <p className="text-xs font-semibold text-smartcont-200 uppercase tracking-wider">
              Principal
            </p>
          </div>
          <Link to="/dashboard" className="flex items-center px-6 py-2.5 text-white bg-smartcont-500">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          <Link to="/modulos" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <span role="img" aria-label="Módulos">📦</span> Módulos
          </Link>
          <Link to="/dashboard/historico" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Histórico
          </Link>
          
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-semibold text-smartcont-200 uppercase tracking-wider">
              Configurações
            </p>
          </div>
          <Link to="/dashboard/perfil" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Perfil
          </Link>
          <Link to="/dashboard/suporte" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Suporte
          </Link>
        </nav>
        <div className="p-4 border-t border-smartcont-500">
          <Button variant="secondary" className="w-full bg-smartcont-500 text-white hover:bg-smartcont-400">
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6">
            <h1 className="text-xl font-semibold text-smartcont-600">Dashboard</h1>
            <div className="flex items-center">
              {/* Botão menu mobile */}
              <button className="md:hidden mr-2 text-gray-600" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={28} />
              </button>
              <span className="mr-3 text-sm text-gray-600">{nome}</span>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        {/* Drawer mobile */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex md:hidden">
            <div className="bg-white w-64 h-full shadow-lg flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg text-smartcont-600">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={28} />
                </button>
              </div>
              <nav className="flex-1 flex flex-col gap-2 p-4">
                <Link to="/dashboard" className="py-2 px-2 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/modulos" className="py-2 px-2 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Módulos</Link>
                <Link to="/dashboard/historico" className="py-2 px-2 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Histórico</Link>
                <Link to="/dashboard/perfil" className="py-2 px-2 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Perfil</Link>
                <Link to="/dashboard/suporte" className="py-2 px-2 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Suporte</Link>
                <Button variant="secondary" className="mt-4 w-full" onClick={() => {/* lógica de logout */ setMobileMenuOpen(false);}}>Sair</Button>
              </nav>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          {/* Welcome section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo, {nome}!</h2>
            <p className="text-gray-600">
              Acesse os módulos disponíveis para otimizar seus processos contábeis.
            </p>
          </div>

          {/* Modules section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Módulos disponíveis</h3>
          
          <Tabs defaultValue="ncm">
            <TabsList className="mb-4">
              <TabsTrigger value="ncm">Conferência de NCM</TabsTrigger>
              <TabsTrigger value="pis-cofins">Tributação PIS/COFINS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ncm">
              <Card>
                <CardHeader>
                  <CardTitle>Conferência de NCM</CardTitle>
                  <CardDescription>
                    Verifique automaticamente a classificação fiscal dos produtos com base nas descrições.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Este módulo analisa a descrição dos produtos e sugere a classificação NCM correta,
                    identificando possíveis inconsistências nos cadastros atuais.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium text-smartcont-600 mb-2">Como funciona:</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                      <li>Faça upload de um arquivo com a lista de produtos.</li>
                      <li>O sistema processará automaticamente cada item.</li>
                      <li>Receba um relatório completo com sugestões e inconsistências.</li>
                      <li>Exporte os resultados em Excel ou PDF.</li>
                    </ol>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleModuleSelection("ncm")}>
                      Acessar módulo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pis-cofins">
              <Card>
                <CardHeader>
                  <CardTitle>Conferência de tributação de PIS e COFINS</CardTitle>
                  <CardDescription>
                    Analise e valide automaticamente a tributação de PIS e COFINS.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Este módulo verifica a tributação de PIS/COFINS dos produtos e serviços,
                    identificando inconsistências e oportunidades de recuperação de créditos.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium text-smartcont-600 mb-2">Como funciona:</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                      <li>Importe os dados fiscais do período a ser analisado.</li>
                      <li>O sistema verificará automaticamente as alíquotas e bases de cálculo.</li>
                      <li>Receba um diagnóstico completo com inconsistências e recomendações.</li>
                      <li>Exporte um relatório detalhado para compartilhar com o cliente.</li>
                    </ol>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleModuleSelection("pis-cofins")}>
                      Acessar módulo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
