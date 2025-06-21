import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PisCofins from "./pages/PisCofins";
import NCM from "./pages/NCM";
import NotFound from "./pages/NotFound";
import Solucoes from "./pages/solucoes";
import RecuperarSenha from "./pages/recuperar-senha";
import Perfil from "./pages/perfil";
import Configuracoes from "./pages/configuracoes";
import Historico from "./pages/historico";
import AnalistaPro from "./pages/AnalistaPro";
import AnalistaProWizard from "./pages/AnalistaProWizard";
import AnalistaProFiscal from "./pages/AnalistaProFiscal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/pis-cofins" element={<PisCofins />} />
          <Route path="/dashboard/ncm" element={<NCM />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/dashboard/perfil" element={<Perfil />} />
          <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
          <Route path="/dashboard/historico" element={<Historico />} />
          <Route path="/dashboard/analista-pro" element={<AnalistaPro />} />
          <Route path="/dashboard/analista-pro/wizard" element={<AnalistaProWizard />} />
          <Route path="/dashboard/analista-pro/fiscal" element={<AnalistaProFiscal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
