import React from "react";
import { Button } from "@/components/ui/button";

const Solucoes: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-smartcont-600 via-smartcont-700 to-smartcont-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2">
            <span role="img" aria-label="maleta">💼</span> Soluções Contábeis Inteligentes
          </h1>
          <p className="text-lg md:text-xl">
            Na SmartCont, a contabilidade não é apenas uma obrigação fiscal — é uma ferramenta estratégica. Nossas soluções são pensadas para automatizar, simplificar e escalar a gestão contábil do seu negócio. Confira o que entregamos:
          </p>
        </div>
      </section>
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><span role="img" aria-label="gráfico">📊</span> BPO Financeiro</h2>
          <ul className="list-disc ml-8 text-gray-700 space-y-1">
            <li>Terceirização completa da sua operação financeira:</li>
            <li>Emissão de boletos, conciliação bancária e fluxo de caixa.</li>
            <li>Controle de contas a pagar/receber.</li>
            <li>Relatórios gerenciais sob demanda.</li>
            <li>Integração com ERPs e bancos.</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><span role="img" aria-label="cérebro">🧠</span> Contabilidade Digital com Foco em Performance</h2>
          <ul className="list-disc ml-8 text-gray-700 space-y-1">
            <li>Escrituração automática com robotização de lançamentos.</li>
            <li>Análises contábeis em tempo real.</li>
            <li>Painéis com indicadores de performance contábil e fiscal.</li>
            <li>Redução de erros e retrabalho via automações.</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><span role="img" aria-label="lupa">🔍</span> Auditoria de Processos e Compliance</h2>
          <ul className="list-disc ml-8 text-gray-700 space-y-1">
            <li>Mapeamento e revisão de processos contábeis.</li>
            <li>Cruzamento de dados com foco em conformidade.</li>
            <li>Relatórios para tomada de decisão.</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mb-2">🚀 Por que escolher a SmartCont?</h2>
          <ul className="list-disc ml-8 text-gray-700 space-y-1">
            <li>🔄 Automação de ponta a ponta</li>
            <li>📞 Suporte consultivo humanizado</li>
            <li>📈 Visão estratégica do seu negócio em números</li>
          </ul>
        </section>
        <div className="text-center mt-8">
          <p className="text-lg font-semibold mb-4">Quer levar a sua contabilidade pro próximo nível?</p>
          <a href="https://wa.me/5562993111621" target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg font-bold">
              Fale com a gente no WhatsApp
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Solucoes; 