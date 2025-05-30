import { auth } from '@/lib/firebase';

export function SidebarLeft() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // ... rest of the component code ...
} 