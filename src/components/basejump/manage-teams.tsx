import { useAccounts } from '@/hooks/use-accounts';

export function ManageTeams() {
  const { data: accounts, isLoading, error } = useAccounts();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar equipes</div>;
  }

  return (
    <div>
      {accounts?.map((account: { id: string; name: string; type: string }) => (
        <div key={account.id}>
          <h3>{account.name}</h3>
          {/* Adicione mais informações da equipe conforme necessário */}
        </div>
      ))}
    </div>
  );
} 