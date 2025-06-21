import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/DashboardLayout";
import { Activity, FileText, Target, Calculator, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ consultas: 0, creditos: 0, acessos: 0, alertas: 0 });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      // Exemplo: buscar estatísticas do usuário
      const userDoc = await getDoc(doc(db, "users", user.uid));
      let statsData = { consultas: 0, creditos: 0, acessos: 0, alertas: 0 };
      if (userDoc.exists()) {
        const d = userDoc.data();
        statsData = {
          consultas: d.consultas || 0,
          creditos: d.creditos || 0,
          acessos: d.acessos || 0,
          alertas: d.alertas || 0
        };
      }
      setStats(statsData);
      // Buscar atividades recentes do usuário
      const q = query(collection(db, "activities"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const activities = querySnapshot.docs.map(doc => doc.data());
      setRecentActivity(activities);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const statsCards = [
    {
      title: "Consultas Realizadas",
      value: stats.consultas,
      trend: 0,
      icon: Activity,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Créditos Disponíveis",
      value: stats.creditos,
      trend: 0,
      icon: Users,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Últimos Acessos",
      value: stats.acessos,
      trend: 0,
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: "Alertas Resolvidos",
      value: stats.alertas,
      trend: 0,
      icon: CheckCircle,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const modules = [
    {
      name: "Conferência de PIS/COFINS",
      description: "Análise automática de tributação",
      icon: Calculator,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      name: "Conferência de NCM",
      description: "Validação de códigos NCM",
      icon: Target,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      name: "Conferência de Escrituração",
      description: "Validação contábil e fiscal",
      icon: FileText,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-smartcont-600">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo de volta! Aqui está um resumo das suas atividades.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-smartcont-600">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                </div>
                {/* Tendência pode ser implementada depois com dados reais */}
                <div className="flex items-center mt-4">
                  <span className={`text-sm ${card.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>{card.trend > 0 ? '+' : ''}{card.trend}%</span>
                  <span className="text-sm text-gray-500 ml-2">vs. mês anterior</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Link para histórico de créditos */}
        <div className="mt-6">
          <a href="/dashboard/historico" className="inline-block px-4 py-2 bg-smartcont-600 text-white rounded hover:bg-smartcont-700 transition">Ver histórico de créditos</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Módulos Disponíveis */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-smartcont-600">Módulos Disponíveis</CardTitle>
              <CardDescription>
                Clique em um módulo para iniciar uma nova conferência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${module.bgColor}`}>
                      <module.icon className={`h-5 w-5 ${module.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-smartcont-600">{module.name}</h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Acessar
                  </Button>
                </div>
              ))}
              {/* Analista PRO */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 opacity-75">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600">Analista PRO</h3>
                    <p className="text-sm text-gray-500">Em breve: inteligência artificial para análise contábil</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Em Breve
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Atividade Recente */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-smartcont-600">Atividade Recente</CardTitle>
              <CardDescription>
                Suas últimas conferências realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length === 0 && <p className="text-gray-500">Nenhuma atividade recente encontrada.</p>}
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg bg-blue-100 flex-shrink-0`}>
                      <Calculator className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title || activity.tipo || "Atividade"}</p>
                      <p className="text-sm text-gray-500">{activity.description || activity.descricao || "-"}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time || activity.data || ""}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800`}>
                      {activity.status || "Concluído"}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full">
                Ver Histórico Completo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-smartcont-600">Ações Rápidas</CardTitle>
            <CardDescription>
              Funcionalidades mais utilizadas para agilizar seu trabalho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 bg-smartcont-600 hover:bg-smartcont-700 flex-col space-y-2">
                <Target className="h-6 w-6" />
                <span>Nova Conferência NCM</span>
              </Button>
              <Button className="h-16 bg-smartcont-600 hover:bg-smartcont-700 flex-col space-y-2">
                <Calculator className="h-6 w-6" />
                <span>Nova Conferência PIS/COFINS</span>
              </Button>
              <Button className="h-16 bg-smartcont-600 hover:bg-smartcont-700 flex-col space-y-2">
                <FileText className="h-6 w-6" />
                <span>Nova Conferência Escrituração</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
