import { deleteUserInfo } from '@//storage/SecureUser';
import { deleteToken } from '@//storage/secureToken';

export const cleanAuthSession = async () => {
  await deleteToken();
  await deleteUserInfo();
  console.info('Sessão limpa. Token e dados do usuário removidos.');
};
