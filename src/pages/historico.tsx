import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

const Historico: React.FC = () => {
  const { user } = useAuth();
  const [creditos, setCreditos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      // Buscar créditos e gastos do usuário
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setCreditos(userDoc.data().creditos || 0);
        setGastos(userDoc.data().gastos || 0);
      }
      // Buscar histórico de uso
      const q = query(collection(db, "activities"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setHistorico(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Histórico de Créditos</h2>
      <div className="mb-4">
        <span className="font-semibold">Créditos disponíveis:</span> {creditos}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Créditos gastos:</span> {gastos}
      </div>
      <h3 className="font-semibold mb-2 mt-6">Histórico de uso</h3>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Data</th>
            <th className="border px-2 py-1">Descrição</th>
            <th className="border px-2 py-1">Créditos</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((item, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{item.data}</td>
              <td className="border px-2 py-1">{item.descricao}</td>
              <td className="border px-2 py-1">{item.creditos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historico; 