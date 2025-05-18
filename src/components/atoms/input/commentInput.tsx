import { TextInput } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function CommentInput({ value, onChangeText }: Props) {
  return (
    <TextInput
      placeholder="Adicionar comentário..."
      multiline
      value={value}
      onChangeText={onChangeText}
      className="mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800"
      style={{ minHeight: 80 }}
    />
  );
}
