// src/molecules/modal/LogoutModal.tsx
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const LogoutModal: React.FC<Props> = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View className="absolute right-4 top-14 bg-white rounded-xl shadow-lg p-4">
          <TouchableOpacity onPress={onLogout}>
            <Text className="text-red-600 text-base">Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogoutModal;
