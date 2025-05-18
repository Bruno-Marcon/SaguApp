import { useEffect, useState } from 'react';
import { NotificationModal } from '../../modal/notificationModalOrganism';
import { NotificationBell } from '@//components/atoms/icons/bell';
import { eventService } from '@//services/events/eventServices';
import { Event } from '../../../../../types/event';
import { addReadNotificationId, getReadNotificationIds } from '@//storage/asyncStorage';

export const BellWithModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<Event[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await eventService.getNotifications();
        const readIds = await getReadNotificationIds();
        const unread = response.data.filter((event) => !readIds.includes(event.id));
        setNotifications(unread);
      } catch (err) {
        console.error('[NOTIFICATION] Erro ao buscar notificações:', err);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    await addReadNotificationId(id);
  };

  return (
    <>
      <NotificationBell
        onPress={() => setModalVisible(true)}
        notificationCount={notifications.length}
      />
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </>
  );
};
