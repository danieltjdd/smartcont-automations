import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Painel Administrativo</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Bem-vindo ao painel administrativo.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
} 