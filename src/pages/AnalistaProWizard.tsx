import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ModulosMenu from '@/components/ModulosMenu';

const steps = [
  "Sistema Contábil",
  "Tipo",
  "Credenciais"
];

const sistemas = [
  { label: "Selecione", value: "" },
  { label: "Sistema Domínio", value: "sistema dominio" },
  { label: "Contimatic", value: "contimatic" },
  { label: "Omie", value: "omie" },
];

const tipos = [
  { label: "Selecione", value: "" },
  { label: "Web", value: "web" },
  { label: "Desktop", value: "desktop" },
];

// Spinner SVG para loading
const Spinner = () => (
  <div className="flex justify-center items-center h-96">
    <svg className="animate-spin h-10 w-10 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  </div>
);

const CardFiscal = ({ usuario_id }) => {
  const handleClick = () => {
    window.location.href = "/dashboard/analista-pro/fiscal";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div
        className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-md max-w-md w-full mb-6 text-center cursor-pointer hover:bg-blue-100"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center mb-4">
          <span style={{ fontSize: 40 }}>📊</span>
        </div>
        <h2 className="text-xl font-bold text-blue-700 mb-2">Módulo Fiscal</h2>
        <p className="text-gray-700 mb-4">Acesse as rotinas fiscais automatizadas do Analista PRO.</p>
      </div>
    </div>
  );
};

const AnalistaProWizard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const usuario_id = user?.email || "visitante";
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    sistema: "",
    tipo: "",
    usuario_id: usuario_id,
    email: user?.email || "",
    senha_web: "",
    usuario: "",
    senha: "",
    salvar: false,
  });
  const [credenciaisSalvas, setCredenciaisSalvas] = useState<null | object>(null);
  const [loading, setLoading] = useState(true);
  const [showFiscalOption, setShowFiscalOption] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!usuario_id || usuario_id === "visitante") return;
    fetch(`http://localhost:8000/api/analista-pro/credenciais/${usuario_id}`)
      .then(res => res.json())
      .then(data => {
        setCredenciaisSalvas(data.credenciais || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [usuario_id]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      usuario_id: user?.email || "visitante",
      email: user?.email || "",
    }));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  const handleNext = async () => {
    if (step === 3) {
      setLoading(true);
      try {
        await fetch("http://localhost:8000/api/analista-pro/credenciais", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setSuccessMessage("Credenciais salvas com sucesso!");
        setShowFiscalOption(true);
      } catch (e) {
        alert("Erro ao salvar credenciais. Tente novamente.");
      }
      setLoading(false);
    } else {
      setStep((s) => s + 1);
    }
  };
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8000/api/analista-pro/execucao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    alert(data.mensagem);
  };

  if (authLoading || loading) {
    return <Spinner />;
  }

  if (showFiscalOption) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center relative" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
        <ModulosMenu onSelect={(modulo) => {
          if (modulo === 'fiscal') window.location.href = '/dashboard/analista-pro/fiscal';
        }} />
        <div className="max-w-xl w-full mx-auto mt-10 p-8 bg-white shadow-md rounded-2xl text-center">
          <div className="text-2xl font-bold text-green-700 mb-4">{successMessage}</div>
          <div className="flex flex-col items-center">
            <CardFiscal usuario_id={form.usuario_id} />
          </div>
        </div>
      </div>
    );
  }

  if (credenciaisSalvas) {
    return <CardFiscal usuario_id={form.usuario_id} />;
  }

  if (!credenciaisSalvas) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
        <div className="max-w-2xl w-full mx-auto mt-10 p-8 bg-white shadow-md rounded-2xl">
          <div className="mb-8 text-center">
            <div className="text-2xl font-bold text-blue-700 mb-2">Primeiro acesso?</div>
            <div className="text-gray-700 text-lg mb-4">Grave suas credenciais para começar a usar o Analista PRO!</div>
          </div>
          {/* Wizard de cadastro de credenciais */}
          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((label, idx) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-base mb-1 ${step === idx+1 ? 'bg-blue-700' : 'bg-gray-300'}`}>{idx+1}</div>
                <span className={`text-xs text-center ${step === idx+1 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>{label}</span>
                {idx < steps.length-1 && <div className="h-1 w-full bg-gray-200 mt-1" />}
              </div>
            ))}
          </div>
          {/* Conteúdo dos passos */}
          {step === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sistema contábil</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                name="sistema"
                value={form.sistema}
                onChange={handleChange}
              >
                {sistemas.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          )}
          {step === 2 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de sistema</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
              >
                {tipos.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usuário Módulo</label>
                  <input
                    type="text"
                    name="usuario"
                    value={form.usuario}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha Módulo</label>
                  <input
                    type="password"
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              {form.tipo === "web" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha Web</label>
                    <input
                      type="password"
                      name="senha_web"
                      value={form.senha_web}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  id="salvar"
                  name="salvar"
                  checked={form.salvar}
                  onChange={handleChange}
                />
                <label htmlFor="salvar" className="text-sm text-gray-700">Salvar credenciais?</label>
              </div>
            </>
          )}
          {/* Navegação */}
          <div className="flex justify-end gap-4 mt-8">
            {step > 1 && (
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-lg"
                onClick={handleBack}
                type="button"
              >
                Voltar
              </button>
            )}
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow"
              onClick={handleNext}
              type="button"
              disabled={
                (step === 1 && !form.sistema) ||
                (step === 2 && !form.tipo) ||
                (step === 3 && (!form.usuario || !form.senha || (form.tipo === "web" && (!form.email || !form.senha_web))))
              }
            >
              {step === 3 ? "Finalizar" : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      <div className="max-w-2xl w-full mx-auto mt-10 p-8 bg-white shadow-md rounded-2xl">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-base mb-1 ${step === idx+1 ? 'bg-blue-700' : 'bg-gray-300'}`}>{idx+1}</div>
              <span className={`text-xs text-center ${step === idx+1 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>{label}</span>
              {idx < steps.length-1 && <div className="h-1 w-full bg-gray-200 mt-1" />}
            </div>
          ))}
        </div>

        {/* Conteúdo dos passos */}
        {step === 1 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sistema contábil</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="sistema"
              value={form.sistema}
              onChange={handleChange}
            >
              {sistemas.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
        {step === 2 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de sistema</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
            >
              {tipos.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        )}
        {step === 3 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuário Módulo</label>
                <input
                  type="text"
                  name="usuario"
                  value={form.usuario}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha Módulo</label>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
            {form.tipo === "web" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha Web</label>
                  <input
                    type="password"
                    name="senha_web"
                    value={form.senha_web}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                id="salvar"
                name="salvar"
                checked={form.salvar}
                onChange={handleChange}
              />
              <label htmlFor="salvar" className="text-sm text-gray-700">Salvar credenciais?</label>
            </div>
          </>
        )}

        {/* Navegação */}
        <div className="flex justify-end gap-4 mt-8">
          {step > 1 && (
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-lg"
              onClick={handleBack}
              type="button"
            >
              Voltar
            </button>
          )}
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow"
            onClick={handleNext}
            type="button"
            disabled={
              (step === 1 && !form.sistema) ||
              (step === 2 && !form.tipo) ||
              (step === 3 && (!form.usuario || !form.senha || (form.tipo === "web" && (!form.email || !form.senha_web))))
            }
          >
            {step === 3 ? "Finalizar" : "Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalistaProWizard; 