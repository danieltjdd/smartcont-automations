import { auth } from '@/lib/firebase';

export function FileUploadHandler() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  return (
    <div>
      {/* Conteúdo do componente */}
    </div>
  );
} 