import { setToken, deleteToken } from "../../storage/secureStore";
import SHA256 from "crypto-js/sha256";


const API_URL="https://cdbw.app.n8n.cloud/webhook/f2a7200d-7e23-4809-a594-ff91c0ae1960" //REMOVER LEMBRAR REMOVER

type LoginResponse = {
  token?: string;
  user?: string;
  [key: string]: any;
};


export const HandleLogin = async (username: string, password: string): Promise<LoginResponse> => {
  
  try {

    const encryptedPassword = SHA256(password).toString();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username, encryptedPassword }),
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

export const Logout = async () => {
  try {
    await deleteToken();
    console.info("Logout bem-sucedido. Token removido.");
  } catch (error: any) {
    console.error("Erro ao fazer logout:", error.message || error);
    throw new Error("Não foi possível realizar o logout.");
  }
};
