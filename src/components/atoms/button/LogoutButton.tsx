import React from 'react'
import { Button } from 'react-native'

interface LogoutButtonProps {
  onPress: () => void
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return <Button title="Sair" onPress={onPress} />
}

export default LogoutButton
