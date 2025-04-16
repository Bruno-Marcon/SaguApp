import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_token";

export async function setToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync('auth_token');
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
}

