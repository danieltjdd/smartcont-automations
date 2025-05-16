import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@/components/PrivateRoute';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Historico from './pages/Historico';
import Perfil from './pages/Perfil';
import Modulos from './pages/Modulos';
import Solucoes from './pages/Solucoes';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/historico"
        element={
          <PrivateRoute>
            <Historico />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />
      <Route
        path="/modulos"
        element={
          <PrivateRoute>
            <Modulos />
          </PrivateRoute>
        }
      />
      <Route
        path="/solucoes"
        element={
          <PrivateRoute>
            <Solucoes />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 