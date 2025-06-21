import { auth } from '@/lib/firebase';

export async function removeTeamMember(teamId: string, memberId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/members/${memberId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao remover membro da equipe');
  }

  return response.json();
}

export async function updateTeamMemberRole(teamId: string, memberId: string, role: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/members/${memberId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar papel do membro');
  }

  return response.json();
} 