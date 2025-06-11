import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Perfil: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setEmail(user.email || "");
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setPhone(data.phone || "");
          setPhoto(data.photo || "");
          setCompany(data.company || "");
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const perfilData = {
      name: name.trim() || user.email?.split("@")[0] || "Usuário",
      phone: phone || "",
      photo: photo || "",
      email: user.email || "",
      company: company || ""
    };
    console.log("[DEBUG] Salvando perfil no Firestore:", perfilData);
    await setDoc(doc(db, "users", user.uid), perfilData, { merge: true });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-col items-center">
          <label htmlFor="photo" className="cursor-pointer">
            <img
              src={photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name || "Usuário")}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border mb-2"
            />
            <input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <span className="text-sm text-gray-500">Clique para alterar foto</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nome completo</label>
          <Input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(00) 00000-0000" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Empresa/Escritório</label>
          <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Nome da empresa" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <Input value={email} disabled />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
        {success && <div className="text-green-600 text-center">Perfil atualizado com sucesso!</div>}
      </form>
    </div>
  );
};

export default Perfil; 