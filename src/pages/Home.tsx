import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">SmartCont Automações</h1>
        <p className="text-xl text-muted-foreground">
          Soluções inteligentes para sua contabilidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conferência de NCM</CardTitle>
            <CardDescription>
              Verifique a consistência dos códigos NCM em suas notas fiscais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/modulos/conferencia-ncm">
              <Button className="w-full">
                Acessar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conferência de PIS/COFINS</CardTitle>
            <CardDescription>
              Analise as operações com PIS/COFINS em suas notas fiscais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/modulos/conferencia-pis-cofins">
              <Button className="w-full">
                Acessar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conferência de Escrituração</CardTitle>
            <CardDescription>
              Verifique a consistência da escrituração contábil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/modulos/conferencia-escrituracao">
              <Button className="w-full">
                Acessar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 