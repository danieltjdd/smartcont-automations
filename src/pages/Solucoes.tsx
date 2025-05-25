import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Solucoes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-smartcont-700">🛠️ Nossas Soluções</h1>
          <p className="text-lg mb-8">
            Na SmartCont, transformamos a contabilidade tradicional em uma experiência digital e eficiente. Utilizamos tecnologia de ponta para otimizar processos contábeis, reduzindo retrabalho e aumentando a produtividade.
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">🔄 Automação de Processos Contábeis</h2>
              <p>
                Implementamos soluções que automatizam tarefas repetitivas, como lançamentos contábeis e conciliações bancárias, permitindo que sua equipe foque em atividades estratégicas.<br />
                <b>Escritório inteligente</b>
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">☁️ Integração com Sistemas Contábeis</h2>
              <p>
                Integramos nossos serviços aos principais sistemas contábeis do mercado, garantindo uma gestão unificada e eficiente das informações financeiras.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">🧠 Consultoria em Processos Contábeis</h2>
              <p>
                Analisamos e reestruturamos seus processos contábeis, identificando oportunidades de melhoria e implementando práticas que aumentam a eficiência operacional.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">🔐 Segurança e Conformidade</h2>
              <p>
                Asseguramos que todos os processos estejam em conformidade com as normas fiscais e contábeis, utilizando tecnologias que garantem a segurança e integridade dos dados.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-smartcont-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">📞 Fale com um consultor</h2>
            <p className="mb-2">Está pronto para transformar a contabilidade da sua empresa? Entre em contato conosco:</p>
            <a href="https://wa.me/5562993111621" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary bg-white text-smartcont-600 px-6 py-2 rounded font-semibold shadow hover:bg-smartcont-50 transition">Iniciar Conversa no WhatsApp</button>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Automação Fiscal</CardTitle>
                <CardDescription>
                  Automatize processos fiscais e reduza erros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/solucoes/automacao-fiscal">
                  <Button className="w-full">
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conferência Contábil</CardTitle>
                <CardDescription>
                  Verifique a consistência dos lançamentos contábeis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/solucoes/conferencia-contabil">
                  <Button className="w-full">
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestão de Documentos</CardTitle>
                <CardDescription>
                  Organize e gerencie seus documentos fiscais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/solucoes/gestao-documentos">
                  <Button className="w-full">
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solucoes; 