import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NavUserWithTeams() {
  const router = useRouter();

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
          <Button onClick={() => router.push("/teams") } className="w-full">
            Gerenciar Equipes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 