import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-smartcont-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
            SC
          </div>
          <span className="text-smartcont-600 font-bold text-xl hidden md:block">SmartCont</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-smartcont-600 font-medium transition-colors">
            Início
          </Link>
          <Link to="/solucoes" className="text-gray-600 hover:text-smartcont-600 font-medium transition-colors">
            Soluções
          </Link>
          <a href="https://wa.me/5562993111621" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-smartcont-600 font-medium transition-colors">
            Contato
          </a>
          <Link to="/login">
            <Button className="bg-smartcont-600 hover:bg-smartcont-700 text-white px-6 py-2 rounded-lg font-medium">
              Entrar
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-smartcont-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-smartcont-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/solucoes" 
              className="text-gray-600 hover:text-smartcont-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Soluções
            </Link>
            <a 
              href="https://wa.me/5562993111621" 
              target="_blank" rel="noopener noreferrer"
              className="text-gray-600 hover:text-smartcont-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </a>
            <Link 
              to="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4"
            >
              <Button className="bg-smartcont-600 hover:bg-smartcont-700 text-white w-full py-3 rounded-lg font-medium">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
