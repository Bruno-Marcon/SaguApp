import { useState } from 'react'
import HelpButton from '../../atoms/button/helpButtonAtom'
import HelpModal from '../modal/helpModalOrganism'


const HelpWidget = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => setIsModalVisible(prev => !prev)

  const handleHelpPress = () => {
    // Aqui você pode definir a ação para "Pedir ajuda"
    console.log('Usuário pediu ajuda')
    setIsModalVisible(false)
  }

  const handleReportPress = () => {
    console.log('Usuário relatou um problema')
    setIsModalVisible(false)
  }

  return (
    <>
      <HelpButton onPress={toggleModal} />
      <HelpModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onHelpPress={handleHelpPress}
        onReportPress={handleReportPress}
      />
    </>
  )
}

export default HelpWidget