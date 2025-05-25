import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Página não encontrada</CardTitle>
          <CardDescription>
            A página que você está procurando não existe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/")} className="w-full">
            Voltar para a página inicial
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
