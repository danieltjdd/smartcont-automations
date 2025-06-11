import { auth } from '@/lib/firebase';

export async function createTeam(name: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar equipe');
  }

  return response.json();
}

export async function updateTeam(teamId: string, name: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar equipe');
  }

  return response.json();
}

export async function deleteTeam(teamId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const token = await user.getIdToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir equipe');
  }

  return response.json();
} 