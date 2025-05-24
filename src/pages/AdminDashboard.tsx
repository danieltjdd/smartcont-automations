import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const AdminDashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Mock users data
  const users = [
    { 
      id: "1", 
      name: "João Silva", 
      email: "joao@contabil.com", 
      company: "Contábil Exemplo Ltda", 
      status: "active",
      lastLogin: "2023-05-01T14:30:00Z",
      expiresAt: "2024-05-01T00:00:00Z"
    },
    { 
      id: "2", 
      name: "Maria Oliveira", 
      email: "maria@finaconta.com", 
      company: "Finaconta Serviços", 
      status: "active",
      lastLogin: "2023-04-28T09:15:00Z",
      expiresAt: "2024-04-28T00:00:00Z"
    },
    { 
      id: "3", 
      name: "Carlos Santos", 
      email: "carlos@santoscontabilidade.com", 
      company: "Santos Contabilidade", 
      status: "inactive",
      lastLogin: "2023-03-15T11:45:00Z",
      expiresAt: "2023-03-15T00:00:00Z"
    },
  ];

  // Mock modules data
  const modules = [
    {
      id: "ncm",
      name: "Conferência de NCM",
      description: "Verifica a classificação fiscal dos produtos.",
      status: "active",
      lastUpdated: "2023-04-25T10:30:00Z",
      version: "1.2.3"
    },
    {
      id: "pis-cofins",
      name: "Tributação PIS/COFINS",
      description: "Analisa e valida a tributação de PIS e COFINS.",
      status: "active",
      lastUpdated: "2023-04-20T14:15:00Z",
      version: "1.1.5"
    },
    {
      id: "escrituracao",
      name: "Conferência de Escrituração",
      description: "Verifica a escrituração fiscal e contábil.",
      status: "development",
      lastUpdated: "2023-04-15T09:45:00Z",
      version: "0.9.1"
    },
  ];

  // Mock activity logs
  const activityLogs = [
    {
      id: "1",
      userId: "1",
      userName: "João Silva",
      action: "login",
      module: null,
      timestamp: "2023-05-01T14:30:00Z",
      details: "Login realizado com sucesso"
    },
    {
      id: "2",
      userId: "1",
      userName: "João Silva",
      action: "module_access",
      module: "ncm",
      timestamp: "2023-05-01T14:35:00Z",
      details: "Acesso ao módulo de Conferência de NCM"
    },
    {
      id: "3",
      userId: "1",
      userName: "João Silva",
      action: "file_upload",
      module: "ncm",
      timestamp: "2023-05-01T14:40:00Z",
      details: "Upload de arquivo 'produtos.xlsx'"
    },
    {
      id: "4",
      userId: "2",
      userName: "Maria Oliveira",
      action: "login",
      module: null,
      timestamp: "2023-04-28T09:15:00Z",
      details: "Login realizado com sucesso"
    },
    {
      id: "5",
      userId: "2",
      userName: "Maria Oliveira",
      action: "module_access",
      module: "pis-cofins",
      timestamp: "2023-04-28T09:20:00Z",
      details: "Acesso ao módulo de Tributação PIS/COFINS"
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleUserAction = (action: string, userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    setSelectedUser(userId);
    
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} usuário`,
      description: `Ação ${action} aplicada ao usuário ${user.name} (${user.email}).`,
    });
  };

  const handleModuleAction = (action: string, moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;
    
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} módulo`,
      description: `Ação ${action} aplicada ao módulo ${module.name}.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-smartcont-600 text-white">
        <div className="flex items-center h-16 px-6 border-b border-smartcont-500">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-smartcont-600 font-bold text-base">
              SC
            </div>
            <span className="font-bold text-lg">SmartCont</span>
          </Link>
        </div>
        <div className="px-6 py-2">
          <Badge className="bg-green-600 hover:bg-green-700">Admin</Badge>
        </div>
        <nav className="flex-1 pt-2 pb-4 overflow-y-auto">
          <div className="px-4 pb-2">
            <p className="text-xs font-semibold text-smartcont-200 uppercase tracking-wider">
              Administração
            </p>
          </div>
          <Link href="/admin" className="flex items-center px-6 py-2.5 text-white bg-smartcont-500">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          <Link href="/admin/usuarios" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Usuários
          </Link>
          <Link href="/admin/modulos" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Módulos
          </Link>
          <Link href="/admin/logs" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Logs de atividade
          </Link>
          <Link href="/admin/site" className="flex items-center px-6 py-2.5 text-smartcont-100 hover:bg-smartcont-500 hover:text-white">
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Editor do site
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
            <h1 className="text-xl font-semibold text-smartcont-600">Painel Administrativo</h1>
            <div className="flex items-center">
              <span className="mr-3 text-sm text-gray-600">
                Administrador
              </span>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Administrativo</h2>
            <p className="text-gray-600">
              Gerencie usuários, módulos e monitore atividades.
            </p>
          </div>

          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="modules">Módulos</TabsTrigger>
              <TabsTrigger value="activity">Logs de atividade</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Usuários</CardTitle>
                  <CardDescription>
                    Visualize, edite e gerencie as contas de acesso dos clientes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>E-mail</TableHead>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Último acesso</TableHead>
                          <TableHead>Expira em</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.company}</TableCell>
                            <TableCell>
                              {user.status === 'active' ? (
                                <Badge className="bg-green-500">Ativo</Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-gray-500">Inativo</Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(user.lastLogin)}</TableCell>
                            <TableCell>{formatDate(user.expiresAt)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUserAction('editar', user.id)}
                                >
                                  Editar
                                </Button>
                                {user.status === 'active' ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                    onClick={() => handleUserAction('bloquear', user.id)}
                                  >
                                    Bloquear
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                    onClick={() => handleUserAction('ativar', user.id)}
                                  >
                                    Ativar
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Exportar lista</Button>
                  <Button>Adicionar usuário</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="modules">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Módulos</CardTitle>
                  <CardDescription>
                    Gerencie os módulos disponíveis na plataforma.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Versão</TableHead>
                          <TableHead>Última atualização</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {modules.map((module) => (
                          <TableRow key={module.id}>
                            <TableCell className="font-medium">{module.name}</TableCell>
                            <TableCell>{module.description}</TableCell>
                            <TableCell>
                              {module.status === 'active' ? (
                                <Badge className="bg-green-500">Ativo</Badge>
                              ) : module.status === 'development' ? (
                                <Badge className="bg-yellow-500">Em desenvolvimento</Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-gray-500">Inativo</Badge>
                              )}
                            </TableCell>
                            <TableCell>{module.version}</TableCell>
                            <TableCell>{formatDate(module.lastUpdated)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleModuleAction('editar', module.id)}
                                >
                                  Editar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleModuleAction('atualizar', module.id)}
                                >
                                  Atualizar
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Ver histórico de versões</Button>
                  <Button>Adicionar novo módulo</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Logs de atividade</CardTitle>
                  <CardDescription>
                    Monitore a atividade dos usuários na plataforma.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuário</TableHead>
                          <TableHead>Ação</TableHead>
                          <TableHead>Módulo</TableHead>
                          <TableHead>Detalhes</TableHead>
                          <TableHead>Data/Hora</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activityLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.userName}</TableCell>
                            <TableCell>
                              {log.action === 'login' && 'Login'}
                              {log.action === 'module_access' && 'Acesso ao módulo'}
                              {log.action === 'file_upload' && 'Upload de arquivo'}
                            </TableCell>
                            <TableCell>{log.module || '-'}</TableCell>
                            <TableCell>{log.details}</TableCell>
                            <TableCell>{formatDate(log.timestamp)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    Mostrando os últimos 5 registros
                  </div>
                  <Button variant="outline">Ver todos os logs</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
