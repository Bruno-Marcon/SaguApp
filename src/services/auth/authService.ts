import { setToken, deleteToken, getToken} from "../../storage/secureStore"; 
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
const apiKey = Constants.expoConfig?.extra?.apiKey;

type UserAttributes = {
  id: string;
  email: string;
  name: string;
  document: string;
  type: string;
};

type LoginResponseData = {
  id: string;
  type: string;
  attributes: UserAttributes;
};

type LoginResponse = { 
  token: string; 
  data: LoginResponseData;
  [key: string]: any; 
};

export const HandleLogin = async (email: string, password: string): Promise<LoginResponse> => { 
  try {  
    const response = await fetch(`${apiUrl}/api/v1/auth/login`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
        "X_API_KEY": apiKey
      }, 
      body: JSON.stringify({ 
        email: email,
        password: password 
      }), 
    }); 

    if (!response.ok) { 
      const errorText = await response.text(); 
      throw new Error(`Erro ao fazer login: ${errorText}`); 
    } 

    const data: LoginResponse = await response.json(); 

    if (data.token) { 
      await setToken(data.token); 
      console.info("Login bem-sucedido. Token salvo com SecureStore."); 
    } else { 
      console.warn("Login realizado, mas nenhum token retornado."); 
    } 

    return data; 
  } catch (error: any) { 
    console.error("Erro no login:", error.message || error); 
    throw new Error("Não foi possível realizar o login. Verifique suas credenciais."); 
  } 
}; 

export const getUserInfo = (loginResponse: LoginResponse): UserAttributes | null => {
  if (loginResponse?.data?.attributes) {
    return loginResponse.data.attributes;
  }
  return null;
};

export const Logout = async () => { 
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('Token não encontrado. O usuário não está logado.');
    }

    const headers = new Headers({
      "Authorization": `Bearer ${token}`,
      "X_API_KEY": apiKey,
    });

    const response = await fetch(`${apiUrl}/api/v1/auth/logout`, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Erro ao fazer logout: ${errorText}`);
    }
    deleteToken();
    console.info("Logout bem-sucedido. Token removido."); 
  } catch (error: any) { 
    console.error("Erro ao fazer logout:", error.message || error); 
    throw new Error("Não foi possível realizar o logout."); 
  } 
};
