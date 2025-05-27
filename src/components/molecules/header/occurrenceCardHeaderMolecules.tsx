import { View, Text } from 'react-native';
import TagGroup from '../badge/tagGroup';
import { Occurrence } from '../../../../types/occurrence';

type Props = {
  title: string;
  status?: string;
  severity?: string;
  kind?: string;
  occurrence?: Occurrence | null;
};

export default function OccurrenceCardHeader({
  title,
  status,
  severity,
  kind,
  occurrence,
}: Props) {
  const currentStatus = occurrence?.attributes?.status || status;
  const currentKind = occurrence?.attributes?.kind || kind;
  const currentSeverity = occurrence?.attributes?.severity || severity;

  return (
    <View className="mb-3">
      <View className="flex-row justify-end mb-1">
        <TagGroup
          status={currentStatus}
          kind={currentKind}
          severity={currentSeverity}
        />
      </View>

      <Text
        className="text-xl font-semibold text-gray-900 dark:text-white"
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  );
}
