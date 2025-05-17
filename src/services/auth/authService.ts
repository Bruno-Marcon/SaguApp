import { setUserInfo } from '@//storage/SecureUser';
import { setToken, getToken } from '../../storage/secureToken';
import { api} from '../api/api';
import { cleanAuthSession } from './authSession';
import { LoginResponse } from '../../../types/auth';
import { endpoints } from '../endpoints';

export const HandleLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    console.log('[Login] Iniciando login com:', { email });

    const data = await api.post(endpoints.auth.login, { email, password });
    console.log('[Login] Resposta da API:', data);

    if (data?.token) {
      console.log('[Login] Token recebido:', data.token);
      await setToken(data.token);

      if (data.data?.attributes) {
        console.log('[Login] Dados do usuário recebidos:', data.data.attributes);
        await setUserInfo(data.data.attributes);
      } else {
        console.warn('[Login] Nenhum dado de usuário encontrado.');
      }

      console.info('[Login] Login bem-sucedido.');
      return data;
    } else {
      console.warn('[Login] Token não encontrado na resposta.');
      throw new Error('Token não encontrado. Não foi possível autenticar o usuário.');
    }
  } catch (error: any) {
    console.error('[Login] Erro durante o login:', error.message || error);
    throw new Error('Não foi possível realizar o login. Verifique suas credenciais.');
  }
};

export const Logout = async () => {
  try {
    const token = await getToken();
    console.log('[Logout] Token atual:', token);

    if (token) {
      console.log('[Logout] Enviando requisição para API...');
      await api.delete(endpoints.auth.logout);
    } else {
      console.warn('[Logout] Nenhum token encontrado, pulando requisição de logout.');
    }

    await cleanAuthSession();
    console.info('[Logout] Sessão limpa e logout finalizado com sucesso.');
  } catch (error: any) {
    console.error('[Logout] Erro durante o logout:', error.message || error);
    throw error;
  }
};
