import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

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
        {!user ? (
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-smartcont-600 font-medium">
              Início
            </Link>
            <Link to="/solucoes" className="text-gray-600 hover:text-smartcont-600 font-medium">
              Soluções
            </Link>
            <a href="https://wa.me/5562993111621" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-smartcont-600 font-medium">
              Contato
            </a>
            <Link to="/login">
              <Button className="btn-primary">Entrar</Button>
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard">
              <Button className="btn-primary">Menu Principal</Button>
            </Link>
          </nav>
        )}

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
        <div className="md:hidden bg-white p-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            {!user ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-smartcont-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Início
                </Link>
                <Link to="/solucoes" className="text-gray-600 hover:text-smartcont-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Soluções
                </Link>
                <a href="https://wa.me/5562993111621" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-smartcont-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Contato
                </a>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="btn-primary w-full">Entrar</Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="btn-primary w-full">Menu Principal</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
