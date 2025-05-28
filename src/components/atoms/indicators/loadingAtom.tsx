import { View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Spinner
        visible={true}
        textContent={'Carregando...'}
        textStyle={{ color: '#F3F2F' }}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
    </View>
  );
};

export default Loading;
