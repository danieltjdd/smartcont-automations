import { useQuery } from '@tanstack/react-query';
import { auth } from '@/lib/firebase';

async function getTeamMembers(teamId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar membros da equipe');
  }

  return response.json();
}

export function ManageTeamMembers({ teamId }: { teamId: string }) {
  const { data: members, isLoading, error } = useQuery({
    queryKey: ['team-members', teamId],
    queryFn: () => getTeamMembers(teamId),
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar membros da equipe</div>;
  }

  return (
    <div>
      {members?.map((member: { id: string; name: string; role: string }) => (
        <div key={member.id}>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
          {/* Adicione mais informações do membro conforme necessário */}
        </div>
      ))}
    </div>
  );
} 