import fiscalIcon from '@/assets/fiscal-icon.svg';

export default function ModulosMenu({ onSelect }) {
  return (
    <nav className="fixed top-8 left-8 z-10">
      <ul className="space-y-4">
        <li>
          <button
            className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl px-4 py-3 shadow hover:bg-blue-50 transition"
            onClick={() => onSelect('fiscal')}
          >
            <img src={fiscalIcon} alt="Fiscal" width={32} height={32} />
            <span className="text-blue-700 font-bold text-lg">Fiscal</span>
          </button>
        </li>
        {/* Adicione outros módulos aqui futuramente */}
      </ul>
    </nav>
  );
} 