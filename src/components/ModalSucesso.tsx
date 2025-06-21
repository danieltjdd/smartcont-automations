export default function ModalSucesso({ open, onClose, onFiscal }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-green-600 text-4xl mb-2">✅</div>
        <h2 className="text-2xl font-bold mb-2">Credenciais salvas com sucesso!</h2>
        <p className="mb-6">Agora você pode acessar o Módulo Fiscal.</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold"
            onClick={onFiscal}
          >
            Ir para o Módulo Fiscal
          </button>
        </div>
      </div>
    </div>
  );
} 