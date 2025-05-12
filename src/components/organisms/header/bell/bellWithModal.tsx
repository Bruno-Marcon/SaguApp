import { useState } from 'react'
import { NotificationModal } from '../../modal/notificationModalOrganism'
import { NotificationBell } from '@//components/atoms/icons/bell'


export const BellWithModal = () => {
  const [modalVisible, setModalVisible] = useState(false)

  // Exemplo de notificações mockadas
  const notifications = [
    { id: '1', message: 'Samuel has settled the restaurant expenses', time: '3 mins ago' },
    { id: '2', message: 'Sabrina has settled the grocery expenses', time: '9 hours ago' },
    { id: '3', message: 'Jolly has added 3 new expenses in Office', time: '15 hours ago' }
  ]

  return (
    <>
      <NotificationBell
        onPress={() => setModalVisible(true)}
        notificationCount={notifications.length}
      />
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={notifications}
      />
    </>
  )
}
