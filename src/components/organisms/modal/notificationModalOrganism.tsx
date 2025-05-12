import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NotificationList } from '../../molecules/list/notificationListMolecules'

type Notification = {
  id: string
  message: string
  time: string
}

type Props = {
  visible: boolean
  onClose: () => void
  data: Notification[]
}
export const NotificationModal = ({ visible, onClose }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 justify-start bg-transparent">
      <View className="mx-4 mt-20 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-semibold text-gray-800">Notificações</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
        <NotificationList />
      </View>
    </View>
  </Modal>
)
