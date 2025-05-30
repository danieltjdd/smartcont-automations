import { useQuery } from '@tanstack/react-query';
import { auth } from '@/lib/firebase';

async function getTeamInvitations(teamId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/invitations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar convites da equipe');
  }

  return response.json();
}

export function ManageTeamInvitations({ teamId }: { teamId: string }) {
  const { data: invitations, isLoading, error } = useQuery({
    queryKey: ['team-invitations', teamId],
    queryFn: () => getTeamInvitations(teamId),
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar convites da equipe</div>;
  }

  return (
    <div>
      {invitations?.map((invitation: { id: string; email: string; status: string }) => (
        <div key={invitation.id}>
          <h3>{invitation.email}</h3>
          <p>{invitation.status}</p>
          {/* Adicione mais informações do convite conforme necessário */}
        </div>
      ))}
    </div>
  );
} 