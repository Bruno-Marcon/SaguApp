import * as SecureStore from "expo-secure-store"

const TOKEN_KEY = "user_token"

export async function setToken(token: string): Promise<void> {
  if (!token) {
    throw new Error("Token inválido")
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token)
  console.log('TokenSalvo')
}

export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY)
}

export async function deleteToken(): Promise<void> {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    if (!token) {
      console.warn("Nenhum token encontrado para deletar.")
      return
    }

    await SecureStore.deleteItemAsync(TOKEN_KEY)
    console.log("Token removido com sucesso.")
  } catch (error) {
    console.error("Erro ao remover o token:", error)
  }
}

