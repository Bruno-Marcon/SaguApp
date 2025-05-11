import { deleteUserInfo, setUserInfo } from "@//storage/SecureUser"
import { setToken, deleteToken, getToken} from "../../storage/secureToken" 
import Constants from 'expo-constants'
const apiUrl = Constants.expoConfig?.extra?.apiUrl
const apiKey = Constants.expoConfig?.extra?.apiKey

type UserAttributes = {
  id: string
  email: string
  name: string
  document: string
  type: string
}

type LoginResponseData = {
  id: string
  type: string
  attributes: UserAttributes
}

type LoginResponse = { 
  token: string 
  data: LoginResponseData
  [key: string]: any 
}

export const HandleLogin = async (email: string, password: string): Promise<LoginResponse> => { 
  try {  
    const response = await fetch(`${apiUrl}/api/v1/auth/login`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
        "X-API-KEY": apiKey
      }, 
      body: JSON.stringify({ 
        email: email,
        password: password 
      }), 
    })

    console.log(`HTTP Response Status: ${response.status}`)

    if (!response.ok) { 
      const errorText = await response.text() 
      console.error(`Erro ao fazer login. Código de status: ${response.status}, Mensagem: ${errorText}`)
      throw new Error(`Erro ao fazer login: ${errorText}`) 
    } 

    const data: LoginResponse = await response.json() 

    if (data.token) { 
      await setToken(data.token)
      await setUserInfo(data.data.attributes)
      console.info("Login bem-sucedido. Token salvo com SecureStore.") 
      return data
    } else { 
      console.warn("Login realizado, mas nenhum token retornado.") 
      throw new Error("Token não encontrado. Não foi possível autenticar o usuário.")
    } 
  } catch (error: any) { 
    console.error("Erro no login:", error.message || error)
    console.error("Erro no login:", error.code || error) 
    console.log("API URL:", apiUrl)
    console.log("API Key:", apiKey)
    throw new Error("Não foi possível realizar o login. Verifique suas credenciais.")
  } 
}

export const Logout = async () => { 
  try {
    const token = await getToken()
    console.log("Token encontrado para logout:", token)

    if (token) {
      const headers = new Headers({
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": apiKey,
      })

      const response = await fetch(`${apiUrl}/api/v1/auth/logout`, {
        method: 'DELETE',
        headers: headers,
      })

      console.log(`HTTP Response Status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text() 
        console.error(`Erro ao fazer logout. Código de status: ${response.status}, Mensagem: ${errorText}`)
        throw new Error(`Erro ao fazer logout: ${errorText}`)
      }
    } else {
      console.warn("Token ausente, pulando requisição de logout.")
    }

    deleteToken()
    deleteUserInfo()
    console.info("Logout bem-sucedido. Token removido.")
    
  } catch (error: any) { 
    console.error("Erro ao fazer logout:", error)
    throw error
  } 
}
