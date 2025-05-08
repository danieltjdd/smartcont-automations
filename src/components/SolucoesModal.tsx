import React from "react";

interface SolucoesModalProps {
  open: boolean;
  onClose: () => void;
}

const SolucoesModal: React.FC<SolucoesModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">🛠️ Nossas Soluções</h2>
        <p className="mb-4">
          Na SmartCont, transformamos a contabilidade tradicional em uma experiência digital e eficiente. Utilizamos tecnologia de ponta para otimizar processos contábeis, reduzindo retrabalho e aumentando a produtividade.
        </p>
        <ul className="space-y-4">
          <li>
            <b>🔄 Automação de Processos Contábeis</b><br />
            Implementamos soluções que automatizam tarefas repetitivas, como lançamentos contábeis e conciliações bancárias, permitindo que sua equipe foque em atividades estratégicas.<br />
            <b>Escritório inteligente</b>
          </li>
          <li>
            <b>☁️ Integração com Sistemas Contábeis</b><br />
            Integramos nossos serviços aos principais sistemas contábeis do mercado, garantindo uma gestão unificada e eficiente das informações financeiras.
          </li>
          <li>
            <b>🧠 Consultoria em Processos Contábeis</b><br />
            Analisamos e reestruturamos seus processos contábeis, identificando oportunidades de melhoria e implementando práticas que aumentam a eficiência operacional.
          </li>
          <li>
            <b>🔐 Segurança e Conformidade</b><br />
            Asseguramos que todos os processos estejam em conformidade com as normas fiscais e contábeis, utilizando tecnologias que garantem a segurança e integridade dos dados.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SolucoesModal; 