// hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { getUserInfo } from '../storage/SecureUser';

export type UserProfileData = {
  name: string;
  email: string;
};

export const useUserProfile = () => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return { userData, loading, error };
};