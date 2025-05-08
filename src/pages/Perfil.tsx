import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const mockUser = {
  avatar: "https://ui-avatars.com/api/?name=Daniel+Almeida&background=4F46E5&color=fff&size=128",
  nome: "Daniel",
  sobrenome: "Almeida",
  email: "smartcont.online@gmail.com",
  endereco: "Anápolis - Goiás",
  telefone: "(62) 99311-1621"
};

const Perfil = () => {
  const [form, setForm] = useState({ ...mockUser });
  const [editando, setEditando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditando(false);
    // Aqui você pode integrar com backend futuramente
    alert("Dados salvos com sucesso!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4 max-w-xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-smartcont-700">Meu Perfil</h1>
        <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-8 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <img
              src={form.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-smartcont-600 object-cover"
            />
            <Button type="button" variant="outline" className="mt-2" disabled>
              Alterar foto (em breve)
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={!editando}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Sobrenome</label>
              <input
                type="text"
                name="sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={!editando}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              disabled={!editando}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Endereço</label>
            <input
              type="text"
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              disabled={!editando}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              disabled={!editando}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            {!editando ? (
              <Button type="button" onClick={() => setEditando(true)}>
                Editar perfil
              </Button>
            ) : (
              <>
                <Button type="submit" className="btn-primary">Salvar</Button>
                <Button type="button" variant="outline" onClick={() => { setForm({ ...mockUser }); setEditando(false); }}>
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Perfil; 