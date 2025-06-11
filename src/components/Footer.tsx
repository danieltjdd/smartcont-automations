import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-smartcont-600 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-smartcont-600 font-bold text-lg">
                SC
              </div>
              <span className="text-white font-bold text-xl">SmartCont</span>
            </Link>
            <p className="text-smartcont-100 text-sm">
              Transformamos processos contábeis em soluções reais para escritórios de contabilidade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-smartcont-100 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/solucoes" className="text-smartcont-100 hover:text-white transition-colors">
                  Soluções
                </Link>
              </li>
              <li>
                <a href="https://wa.me/5562993111621" target="_blank" rel="noopener noreferrer" className="text-smartcont-100 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-2 text-smartcont-100 text-sm">
              <p>📧 smartcont.online@gmail.com</p>
              <p>📱 <a href="https://wa.me/5562993111621" target="_blank" rel="noopener noreferrer">(62) 9 9311-1621</a></p>
              <p>📍 Anápolis, GO</p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/smartcont" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-smartcont-500 rounded-lg flex items-center justify-center hover:bg-smartcont-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/smartcont" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-smartcont-500 rounded-lg flex items-center justify-center hover:bg-smartcont-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348S9.746 16.988 8.449 16.988zM12.017 7.742c-2.32 0-4.199 1.879-4.199 4.199s1.879 4.199 4.199 4.199s4.199-1.879 4.199-4.199S14.337 7.742 12.017 7.742zM15.586 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348S16.883 16.988 15.586 16.988z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/smartcont" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-smartcont-500 rounded-lg flex items-center justify-center hover:bg-smartcont-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-smartcont-500 mt-8 pt-8 text-center">
          <p className="text-smartcont-100 text-sm">
            © 2024 SmartCont Processos Inteligentes. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
