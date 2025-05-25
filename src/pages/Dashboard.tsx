import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from '@/contexts/AuthContext';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (!user) {
    return <div>Usuário não autenticado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Bem-vindo ao seu painel de controle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Conteúdo do dashboard */}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
