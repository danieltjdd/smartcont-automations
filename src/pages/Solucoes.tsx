import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Solucoes() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Soluções</CardTitle>
              <CardDescription>
                Conheça nossas soluções para otimizar seus processos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Conteúdo das soluções */}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
} 