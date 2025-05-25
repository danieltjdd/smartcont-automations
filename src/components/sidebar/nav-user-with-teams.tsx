import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function NavUserWithTeams() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Equipes</CardTitle>
          <CardDescription>
            Gerencie suas equipes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/teams")} className="w-full">
            Gerenciar Equipes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 