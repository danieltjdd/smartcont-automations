import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 bg-secondary text-secondary-foreground mt-8">
      <div className="container mx-auto text-center">
        <span>&copy; {new Date().getFullYear()} Meu Projeto Next.js. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer; 