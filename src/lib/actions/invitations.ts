import { auth } from '@/lib/firebase';

export async function createTeamInvitation(teamId: string, email: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/invitations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar convite');
  }

  return response.json();
}

export async function deleteTeamInvitation(teamId: string, invitationId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/invitations/${invitationId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir convite');
  }

  return response.json();
}

export async function acceptTeamInvitation(invitationId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations/${invitationId}/accept`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao aceitar convite');
  }

  return response.json();
} 