// src/services/notifications/registerForPushNotifications.ts
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { endpoints } from '@//services/endpoints';
import { api } from '../api/api';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('[NOTIFICATION] Permissão negada para notificações');
    return;
  }

  const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();

  console.log('[NOTIFICATION] Expo Token gerado:', expoPushToken);

  try {
    await api.put(endpoints.expoToken.root, {
      expo_token: expoPushToken,
    });
    console.log('[NOTIFICATION] Token salvo com sucesso');
  } catch (err) {
    console.error('[NOTIFICATION] Erro ao salvar token:', err);
  }

  return expoPushToken;
}
