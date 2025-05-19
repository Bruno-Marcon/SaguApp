import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const showToast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: message,
      position: 'top',
      visibilityTime: 4000,
    });
  },

  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: 'Informação',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },
};
