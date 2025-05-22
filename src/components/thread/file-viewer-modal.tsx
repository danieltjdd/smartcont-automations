import { auth } from '@/lib/firebase';

interface FileViewerModalProps {
  file: any;
  onClose: () => void;
}

export function FileViewerModal({ file, onClose }: FileViewerModalProps) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Implementação mínima para não quebrar o build
  return null;
} 