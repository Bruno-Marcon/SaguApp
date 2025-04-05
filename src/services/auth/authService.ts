import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (user: string, password: string) => {
  const response = await fetch('https://hsds.app.n8n.cloud/webhook-test/63980f5d-9f97-4d9b-be87-fea2225cdff1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, password }),
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer login');
  }
  const result = await response.json();

  if (result.token) {
    await AsyncStorage.setItem('token', result.token);
  }

  return result;
};
