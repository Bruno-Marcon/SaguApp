import { useEffect } from 'react';
import { getSavedExpoToken } from '../services/notification/tokenService';
import { eventService } from '../services/events/eventServices';
import { sendPushNotification } from '../services/notification/sendNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = 'sent_notification_ids';

export function useNotificationWatcher() {
  useEffect(() => {
    const checkAndNotify = async () => {
      try {
        const token = await getSavedExpoToken();
        if (!token) return;

        const events = await eventService.getNotifications();
        const sentIds = await AsyncStorage.getItem(STORAGE_KEY);
        const sentIdsArray = sentIds ? JSON.parse(sentIds) : [];

        const newEvents = events.data.filter(
          (event) => !sentIdsArray.includes(event.id)
        );

        for (const event of newEvents) {
          await sendPushNotification(
            token,
            'Nova ocorrência atribuída',
            event.attributes.description,
            {
              screen: 'ocorrencias',
              event_id: event.id,
            }
          );

          // Marca como enviada
          sentIdsArray.push(event.id);
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sentIdsArray));
      } catch (error) {
        console.error('[NOTIFICATION] Erro no watcher:', error);
      }
    };

    const interval = setInterval(checkAndNotify, 60000);
    return () => clearInterval(interval);
  }, []);
}
