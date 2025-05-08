import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-smartcont-700 to-smartcont-600 text-white">
          <div className="container-custom section">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6 animate-fadeIn">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Transformamos Processos Contábeis em Soluções Reais
                </h1>
                <p className="text-xl md:text-2xl text-smartcont-100">
                  Somos especialistas em processos contábeis com foco total em otimizar a rotina dos escritórios de contabilidade e das empresas que eles atendem.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button className="btn-primary bg-white text-smartcont-600 hover:bg-smartcont-50">
                      Começar agora
                    </Button>
                  </Link>
                  <Link to="/solucoes">
                    <Button className="btn-secondary bg-transparent text-white border-white hover:bg-smartcont-500">
                      Nossas soluções
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white rounded-lg p-6 text-smartcont-600 shadow-xl w-full max-w-md">
                  <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
                  <p className="text-lg mb-6">
                    Aumentar a produtividade, eliminar retrabalho e garantir mais tempo e qualidade de vida para você e sua equipe.
                  </p>
                  <div className="bg-smartcont-50 p-4 rounded-lg">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCheck className="h-6 w-6 text-smartcont-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Automatize tarefas repetitivas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-6 w-6 text-smartcont-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Reduza erros em processos manuais</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-6 w-6 text-smartcont-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Ganhe produtividade com soluções inteligentes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems and Solutions Section */}
        <section className="bg-gray-50">
          <div className="container-custom section">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Nossas Soluções</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Na SmartCont, transformamos a contabilidade tradicional em uma experiência digital e eficiente. Utilizamos tecnologia de ponta para otimizar processos contábeis, reduzindo retrabalho e aumentando a produtividade. <br /><br />
                <b>Principais soluções:</b>
                <ul className="list-disc list-inside text-left mt-4">
                  <li>🔄 Automação de Processos Contábeis</li>
                  <li>☁️ Integração com Sistemas Contábeis</li>
                  <li>🧠 Consultoria em Processos Contábeis</li>
                  <li>🔐 Segurança e Conformidade</li>
                </ul>
              </p>
              <div className="mt-8">
                <Link to="/solucoes">
                  <Button className="btn-primary">Conheça todas as soluções</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Technology + Accounting Section */}
        <section className="bg-white">
          <div className="container-custom section">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-smartcont-600 text-white rounded-lg p-8 shadow-xl">
                  <h2 className="text-3xl font-bold mb-6">Tecnologia + Contabilidade</h2>
                  <p className="text-xl mb-8">Mais do que sistemas: entregamos inteligência aplicada.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-white rounded-full p-2 mr-4 text-smartcont-600">
                        <CheckCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Especialistas em contabilidade</h3>
                        <p>Nossa equipe entende os processos contábeis e seus desafios específicos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white rounded-full p-2 mr-4 text-smartcont-600">
                        <CheckCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Soluções personalizadas</h3>
                        <p>Adaptamos nossas ferramentas à sua realidade operacional</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white rounded-full p-2 mr-4 text-smartcont-600">
                        <CheckCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Tecnologia prática</h3>
                        <p>Ferramentas simples e eficazes que se integram à sua rotina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 space-y-6">
                <h2 className="heading-2">Módulos disponíveis</h2>
                <p className="text-xl text-gray-600">
                  Nossas soluções são projetadas para automatizar tarefas complexas, reduzir erros e aumentar a produtividade do seu escritório.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-smartcont-600 mb-2">Conferência de NCM</h3>
                    <p className="text-gray-600">
                      Automatização da análise e validação de NCM, evitando problemas fiscais e garantindo conformidade.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-smartcont-600 mb-2">Conferência de Tributação de PIS e COFINS</h3>
                    <p className="text-gray-600">
                      Análise automática e diagnóstico completo da tributação de PIS/COFINS, identificando inconsistências.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link to="/solucoes">
                    <Button className="btn-primary">Conheça todas as soluções</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-smartcont-600 to-smartcont-500 text-white">
          <div className="container-custom py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar seus processos contábeis?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Comece hoje mesmo a otimizar a rotina do seu escritório com nossas soluções inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button className="btn-primary bg-white text-smartcont-600 hover:bg-smartcont-50">
                  Criar conta gratuita
                </Button>
              </Link>
              <Link to="/contato" onClick={e => {e.preventDefault(); window.open('https://wa.me/5562993111621', '_blank');}}>
                <Button className="btn-secondary bg-transparent text-white border-white hover:bg-smartcont-500">
                  Falar com consultor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Data for the challenges section
const challenges = [
  {
    problem: "Dificuldade nas conferências de escrituração?",
    description: "Processos lentos e suscetíveis a erros humanos durante as conferências de escrituração fiscal e contábil.",
  },
  {
    problem: "Perde tempo com tarefas manuais e processos repetitivos?",
    description: "Horas desperdiçadas em verificações e correções que poderiam ser automatizadas.",
  },
  {
    problem: "NCM incorreto ou cadastro inconsistente?",
    description: "Problemas com classificação fiscal incorreta que podem gerar autuações e prejuízos para seus clientes.",
  },
  {
    problem: "Fechamento de PIS e Cofins com erros operacionais?",
    description: "Dificuldades na apuração correta de créditos e débitos de PIS e COFINS que impactam o resultado.",
  },
  {
    problem: "Cliente sem controle financeiro adequado?",
    description: "Desorganização financeira dos clientes que dificulta o trabalho contábil e a tomada de decisões.",
  },
  {
    problem: "Retrabalho constante que afeta a produtividade?",
    description: "Repetição de tarefas que poderiam ser automatizadas, consumindo o tempo da sua equipe.",
  }
];

export default Index;
