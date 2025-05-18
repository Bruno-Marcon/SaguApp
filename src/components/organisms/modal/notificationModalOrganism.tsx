import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NotificationList } from '../../molecules/list/notificationListMolecules';
import { Event } from '../../../../types/event';

type Props = {
  visible: boolean;
  onClose: () => void;
  notifications: Event[];
  onMarkAsRead: (id: string) => void;
};

export const NotificationModal = ({ visible, onClose, notifications, onMarkAsRead }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 justify-start bg-black/30">
      <View className="mx-4 mt-20 bg-white rounded-2xl p-4 shadow-lg border border-gray-200 max-h-[80%]">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-bold text-gray-800">Notificações</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <NotificationList
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
        />
      </View>
    </View>
  </Modal>
);
