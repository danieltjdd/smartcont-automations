
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCheck, Target, Clock, FileCheck, Calculator, TrendingUp, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-smartcont-600 via-smartcont-700 to-smartcont-800 text-white">
          <div className="container-custom py-20 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-8">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Transformamos Processos Contábeis em <span className="text-smartcont-100">Soluções Reais</span>
                </h1>
                <p className="text-xl lg:text-2xl text-smartcont-100 leading-relaxed">
                  Somos especialistas em processos contábeis com foco total em otimizar a rotina dos escritórios de contabilidade e das empresas que eles atendem.
                </p>
                <div className="pt-6">
                  <Link to="/login">
                    <Button size="lg" className="bg-white text-smartcont-600 hover:bg-smartcont-50 text-lg px-8 py-4 rounded-lg font-semibold">
                      Começar agora
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <Card className="bg-white/10 backdrop-blur border-white/20">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">Nossa Missão</h2>
                    <p className="text-lg mb-6 text-smartcont-100">
                      Aumentar a produtividade, eliminar retrabalho e garantir mais tempo e qualidade de vida para você e sua equipe.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Automatize tarefas repetitivas",
                        "Reduza erros em processos manuais", 
                        "Ganhe produtividade com soluções inteligentes"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCheck className="h-6 w-6 text-green-400 flex-shrink-0" />
                          <span className="text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Desafios Comuns */}
        <section className="bg-gray-50">
          <div className="container-custom section">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Enfrenta esses desafios no seu escritório?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sabemos as dores que os escritórios contábeis enfrentam diariamente. Nossas soluções foram desenvolvidas para resolver problemas reais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-smartcont-100 rounded-lg">
                        <challenge.icon className="h-6 w-6 text-smartcont-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-smartcont-600 mb-2">{challenge.title}</h3>
                        <p className="text-gray-600 mb-4">{challenge.description}</p>
                        <div className="flex items-center text-green-600 font-medium">
                          <CheckCheck className="h-5 w-5 mr-2" />
                          <span>Temos a solução</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="bg-white">
          <div className="container-custom section">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="heading-2 mb-6">Tecnologia + Contabilidade</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Mais do que sistemas: entregamos inteligência aplicada.
                </p>
                
                <div className="space-y-6">
                  {differentials.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-3 bg-smartcont-600 rounded-lg">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-smartcont-600 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <Card className="bg-gradient-to-br from-smartcont-600 to-smartcont-700 text-white">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold mb-8">Módulos Disponíveis</h2>
                    
                    <div className="space-y-6">
                      {modules.map((module, index) => (
                        <div key={index} className="border border-white/20 rounded-lg p-6 bg-white/10 backdrop-blur">
                          <div className="flex items-start space-x-4">
                            <module.icon className="h-8 w-8 text-smartcont-100 flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                              <p className="text-smartcont-100">{module.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <Link to="/login">
                        <Button className="bg-white text-smartcont-600 hover:bg-smartcont-50 w-full lg:w-auto">
                          Conheça todas as soluções
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-gradient-to-r from-smartcont-600 to-smartcont-500">
          <div className="container-custom py-20 text-center text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Pronto para transformar seus processos contábeis?
            </h2>
            <p className="text-xl lg:text-2xl mb-10 max-w-4xl mx-auto">
              Comece hoje mesmo a otimizar a rotina do seu escritório com nossas soluções inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-white text-smartcont-600 hover:bg-smartcont-50 px-8 py-4 text-lg font-semibold">
                  Criar conta gratuita
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-smartcont-600 px-8 py-4 text-lg font-semibold">
                Falar com consultor
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Data for challenges section
const challenges = [
  {
    icon: FileCheck,
    title: "Dificuldade nas conferências de escrituração",
    description: "Processos lentos e suscetíveis a erros humanos durante as conferências de escrituração fiscal e contábil."
  },
  {
    icon: Clock,
    title: "Perda de tempo com tarefas manuais",
    description: "Horas desperdiçadas em verificações e correções que poderiam ser automatizadas."
  },
  {
    icon: Target,
    title: "NCM incorreto ou cadastro inconsistente",
    description: "Problemas com classificação fiscal incorreta que podem gerar autuações e prejuízos."
  },
  {
    icon: Calculator,
    title: "Fechamento de PIS e Cofins com erros",
    description: "Dificuldades na apuração correta de créditos e débitos que impactam o resultado."
  },
  {
    icon: TrendingUp,
    title: "Cliente sem controle financeiro",
    description: "Desorganização financeira que dificulta o trabalho contábil e tomada de decisões."
  },
  {
    icon: Target,
    title: "Retrabalho constante",
    description: "Repetição de tarefas que poderiam ser automatizadas, consumindo tempo da equipe."
  }
];

// Data for differentials section
const differentials = [
  {
    icon: Users,
    title: "Especialistas em contabilidade",
    description: "Nossa equipe entende os processos contábeis e seus desafios específicos."
  },
  {
    icon: Shield,
    title: "Soluções personalizadas", 
    description: "Adaptamos nossas ferramentas à sua realidade operacional."
  },
  {
    icon: Zap,
    title: "Tecnologia prática",
    description: "Ferramentas simples e eficazes que se integram à sua rotina."
  }
];

// Data for modules section
const modules = [
  {
    icon: Target,
    title: "Conferência de NCM",
    description: "Automatização da análise e validação de NCM, evitando problemas fiscais."
  },
  {
    icon: Calculator,
    title: "Conferência de PIS/COFINS", 
    description: "Análise automática e diagnóstico completo da tributação de PIS/COFINS."
  },
  {
    icon: FileCheck,
    title: "Conferência de Escrituração",
    description: "Validação automática de escrituração contábil e fiscal."
  }
];

export default Index;
