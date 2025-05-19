import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { api } from '../api/api';
import { endpoints } from '../endpoints';
import { getToken} from '@//storage/secureToken';
import { getUserInfo } from '@//storage/SecureUser';

export async function registerForPushNotificationsAsync() {
  const user = await getUserInfo();
  const token = await getToken();

  if (!user || !token) {
    console.warn('[NOTIFICATION] Usuário não autenticado, não salvando token');
    return;
  }

  if (!Device.isDevice) {
    console.warn('[NOTIFICATION] Deve ser executado em dispositivo físico');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('[NOTIFICATION] Permissão de notificação negada');
    return;
  }

  const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('[NOTIFICATION] Expo Token gerado:', expoPushToken);

  try {
    await api.put(endpoints.expoToken.root, {
      expo_token: expoPushToken,
    });
    console.log('[NOTIFICATION] Token salvo com sucesso');
  } catch (error) {
    console.error('[NOTIFICATION] Erro ao salvar token:', error);
  }
}
