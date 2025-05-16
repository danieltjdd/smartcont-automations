import { auth } from '@/lib/firebase';

export function FileUploadHandler({ onUpload }: FileUploadHandlerProps) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // ... rest of the component code ...
} 