import * as SecureStore from "expo-secure-store"

const USER_INFO_KEY = "user_info"

export async function setUserInfo(user: {
  id: string
  email: string
  name: string
  document: string
  type: string
}): Promise<void> {
  await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(user))
}

export async function getUserInfo(): Promise<{
  id: string
  email: string
  name: string
  document: string
  type: string
} | null> {
  const data = await SecureStore.getItemAsync(USER_INFO_KEY)
  return data ? JSON.parse(data) : null
}

export async function deleteUserInfo(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(USER_INFO_KEY)
  } catch (error) {
    console.error('Erro ao remover as informações do usuário:', error)
  }
}
