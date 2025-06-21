
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-smartcont-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">Página não encontrada</h2>
          <p className="mt-6 text-base text-gray-600">
            Desculpe, não conseguimos encontrar a página que você está procurando.
          </p>
          <div className="mt-10">
            <Link to="/">
              <Button>Voltar ao início</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
