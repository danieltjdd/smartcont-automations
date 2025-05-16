import { auth } from '@/lib/firebase';

export function FileViewerModal({ file, onClose }: FileViewerModalProps) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // ... rest of the component code ...
} 