import { auth } from '@/lib/firebase';
import { useAuthContext } from '@/contexts/AuthContext';

export function NavUserWithTeams() {
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // ... rest of the component code ...
} 