import { View, Text, TouchableOpacity } from 'react-native'

type ErrorMessageProps = {
  message: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <View className="flex-1 items-center justify-center p-4">
    <Text className="text-red-500 text-lg mb-4">{message}</Text>
    {onRetry && (
      <TouchableOpacity
        onPress={onRetry}
        className="bg-blue-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white">Tentar novamente</Text>
      </TouchableOpacity>
    )}
  </View>
)