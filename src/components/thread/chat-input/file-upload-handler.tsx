import { auth } from '@/lib/firebase';

interface FileUploadHandlerProps {
  onUpload: (file: File) => void;
}

export function FileUploadHandler({ onUpload }: FileUploadHandlerProps) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Implementação mínima para não quebrar o build
  return null;
} 