import { setToken } from '../../storage/mmkv';
import SHA256 from 'crypto-js/sha256'

export const login = async (user: string, password: string) => {

  const encryptedPassword = SHA256(password).toString()

  const response = await fetch('https://hsds.app.n8n.cloud/webhook/63980f5d-9f97-4d9b-be87-fea2225cdff1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, encryptedPassword }),
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer login');
  }

  const result = await response.json();

  if (result.token) {
    console.log(result)
  }

  return result;
};
