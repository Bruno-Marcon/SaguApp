import { useEffect, useState } from 'react';
import { getUserInfo } from "@//storage/SecureUser";
import { renderErrorState, renderLoadingState, validateUserData } from "@//utils/profileUtils";
import { SettingsTemplate } from '@//components/templates/settings/settingsTemplate';

export default function SettingsScreen() {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        setUserData(data);
      } catch (err: any) {
        console.error('Erro ao obter dados do usuário:', err);
        setError('Erro ao carregar perfil do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return renderLoadingState();
  if (error) return renderErrorState(error);
  if (!validateUserData(userData)) return renderErrorState('Dados inválidos');

  return (
    <SettingsTemplate
      name={userData!.name} 
      email={userData!.email} 
    />
  );
}
