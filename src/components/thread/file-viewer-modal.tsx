import { auth } from '@/lib/firebase';

export function FileViewerModal() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Implementação mínima para não quebrar o build
  return null;
} 