import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const mockHistorico = [
  {
    id: 1,
    data: "2024-05-08 10:15",
    tipo: "NCM",
    descricao: "Consulta de NCM para planilha Produtos_Maio.xlsx",
    creditos: 0,
    status: "Sucesso"
  },
  {
    id: 2,
    data: "2024-05-07 16:40",
    tipo: "PIS/COFINS",
    descricao: "Verificação de PIS/COFINS para planilha Clientes_Abril.xlsx",
    creditos: 0,
    status: "Sucesso"
  },
  {
    id: 3,
    data: "2024-05-06 09:20",
    tipo: "NCM",
    descricao: "Consulta de NCM para planilha Estoque.xlsx",
    creditos: 0,
    status: "Sucesso"
  },
  {
    id: 4,
    data: "2024-05-05 14:10",
    tipo: "PIS/COFINS",
    descricao: "Verificação de PIS/COFINS para planilha Vendas_Março.xlsx",
    creditos: 0,
    status: "Sucesso"
  },
];

const ncmConsultas = mockHistorico.filter(item => item.tipo === "NCM").length;
const pisCofinsConsultas = mockHistorico.filter(item => item.tipo === "PIS/COFINS").length;

const Historico = () => {
  const { user } = useAuth();
  const nome = user?.displayName || user?.email || "Usuário";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-smartcont-700">Histórico de Uso</h1>
        <div className="mb-4 text-right text-gray-600 font-medium">{nome}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total de créditos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-smartcont-600">200</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Consultas NCM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-smartcont-600">{ncmConsultas}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Consultas PIS/COFINS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-smartcont-600">{pisCofinsConsultas}</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Detalhamento do uso</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistorico.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.data}</TableCell>
                  <TableCell>
                    <Badge variant={item.tipo === "NCM" ? "default" : "secondary"}>{item.tipo}</Badge>
                  </TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{item.creditos}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Sucesso" ? "default" : "destructive"}>{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Historico;
