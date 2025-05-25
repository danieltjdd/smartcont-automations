import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Modulos from './pages/Modulos';
import Solucoes from './pages/Solucoes';
import NotFound from './pages/NotFound';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modulos" element={<Modulos />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
} 