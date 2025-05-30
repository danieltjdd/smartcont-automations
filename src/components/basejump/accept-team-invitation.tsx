import { useQuery } from '@tanstack/react-query';
import { auth } from '@/lib/firebase';

async function getInvitation(invitationId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations/${invitationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar convite');
  }

  return response.json();
}

export function AcceptTeamInvitation({ invitationId }: { invitationId: string }) {
  const { data: invitation, isLoading, error } = useQuery({
    queryKey: ['invitation', invitationId],
    queryFn: () => getInvitation(invitationId),
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar convite</div>;
  }

  return (
    <div>
      <h3>Convite para {invitation?.teamName}</h3>
      <p>Status: {invitation?.status}</p>
      {/* Adicione mais informações do convite conforme necessário */}
    </div>
  );
} 