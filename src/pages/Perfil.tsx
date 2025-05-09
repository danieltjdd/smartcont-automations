import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";

const Perfil = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    avatar: "",
    nome: "",
    sobrenome: "",
    email: "",
    endereco: "",
    telefone: ""
  });
  const [editando, setEditando] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [formOriginal, setFormOriginal] = useState(form); // Para restaurar ao cancelar

  useEffect(() => {
    if (user) {
      // Gera avatar baseado no email do usuário
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || '')}&background=4F46E5&color=fff&size=128`;
      const novoForm = {
        avatar: user.photoURL || avatarUrl,
        nome: user.displayName?.split(' ')[0] || '',
        sobrenome: user.displayName?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        endereco: '',
        telefone: ''
      };
      setForm(novoForm);
      setFormOriginal(novoForm);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Atualiza o perfil no Firebase
      await updateProfile(user, {
        displayName: `${form.nome} ${form.sobrenome}`.trim(),
        photoURL: previewAvatar || form.avatar
      });

      setEditando(false);
      setForm((prev) => ({ ...prev, avatar: previewAvatar || prev.avatar }));
      setPreviewAvatar(null);
      
      toast({
        title: "Sucesso",
        description: "Dados salvos com sucesso!",
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar dados",
        variant: "destructive"
      });
    }
  };

  const handleEdit = () => {
    setFormOriginal(form); // Salva estado original para cancelar
    setEditando(true);
  };

  const handleCancel = () => {
    setForm(formOriginal); // Restaura estado original
    setEditando(false);
    setPreviewAvatar(null);
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow py-10 px-4 max-w-xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8 text-smartcont-700">Meu Perfil</h1>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-center text-gray-600">Por favor, faça login para acessar seu perfil.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4 max-w-xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-smartcont-700">Meu Perfil</h1>
        <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-8 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <img
              src={previewAvatar || form.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-smartcont-600 object-cover"
            />
            {editando && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">Selecione uma imagem do seu computador</span>
              </>
            )}
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
              disabled={true}
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
              <Button type="button" onClick={handleEdit}>
                Editar perfil
              </Button>
            ) : (
              <>
                <Button type="submit" className="btn-primary">Salvar</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
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