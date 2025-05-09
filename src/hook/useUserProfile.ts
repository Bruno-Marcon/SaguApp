import { useState, useEffect, useCallback } from 'react';
import { getUserInfo } from '../storage/SecureUser';

export type UserProfileData = {
  name: string;
  email: string;
  // Adicione outros campos conforme necessário
};

type UseUserProfileReturn = {
  userData: UserProfileData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export const useUserProfile = (): UseUserProfileReturn => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userInfo = await getUserInfo();
      
      if (!userInfo) {
        throw new Error('Nenhum dado de usuário encontrado');
      }

      if (!userInfo.name || !userInfo.email) {
        throw new Error('Dados do usuário incompletos');
      }

      setUserData({
        name: userInfo.name,
        email: userInfo.email
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    userData,
    loading,
    error,
    refresh: loadData // Permite recarregar os dados manualmente
  };
};