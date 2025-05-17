import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import LoginForm from '../../molecules/form/loginForm';

type LoginScreenProps = {
  text: string;
  subSubTitle: string;
  viewClassName?: string;
};

const LoginScreen: React.FC<LoginScreenProps> = ({
  text,
  subSubTitle,
  viewClassName = 'flex-1 justify-center items-center bg-gray-50 px-6',
}) => {
  const [biometricSupported, setBiometricSupported] = React.useState(false);
  const [biometricType, setBiometricType] = React.useState<'face' | 'finger' | null>(null);

  React.useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (compatible && enrolled) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setBiometricType('finger');
        } else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setBiometricType('face');
        }
        setBiometricSupported(true);
      }
    })();
  }, []);

  const handleBiometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Entrar com biometria',
      fallbackLabel: 'Usar senha',
    });

    if (result.success) {
      const token = await SecureStore.getItemAsync('user_token');
      if (token) {
        Alert.alert('Login com sucesso', 'Autenticado com biometria!');
      } else {
        Alert.alert('Biometria válida', 'Mas nenhum token foi encontrado.');
      }
    } else {
      Alert.alert('Falha na autenticação', 'Tente novamente.');
    }
  };

  const renderBiometricIcon = () => {
    if (biometricType === 'face') {
      return <Feather name="smile" size={20} color="#059669" />;
    }
    if (biometricType === 'finger') {
      return <MaterialIcons name="fingerprint" size={24} color="#059669" />;
    }
    return <Feather name="lock" size={20} color="#059669" />;
  };

  return (
    <View className={viewClassName}>
      {/* GIF animado como logo */}
      <Image
        source={require('../../../assets/images/logo-sagu-mobile-brancoBg.png')}
        style={{ width: 280, height: 280, marginBottom: 24 }}
        resizeMode="contain"
      />

      <LoginForm text={text} />

      {biometricSupported && (
        <TouchableOpacity
          onPress={handleBiometricLogin}
          className="mt-6 flex-row items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-sm shadow-emerald-100"
        >
          {renderBiometricIcon()}
          <Text className="text-emerald-700 font-medium">
            Entrar com {biometricType === 'face' ? 'Face ID' : 'Digital'}
          </Text>
        </TouchableOpacity>
      )}

      <Text className="text-xs text-gray-400 mt-6 text-center">{subSubTitle}</Text>
    </View>
  );
};

export default LoginScreen;
