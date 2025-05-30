import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 bg-primary text-primary-foreground shadow">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Meu Projeto Next.js</h1>
      </div>
    </header>
  );
};

export default Header; 