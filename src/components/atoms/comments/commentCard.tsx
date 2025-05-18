import React from 'react';
import { View, Text } from 'react-native';
import { formatDate } from '@//utils/dateUtils';
import { Event as OccurrenceEvent } from '../../../../types/event';

interface Props {
  event: OccurrenceEvent;
}

export const CommentCard = ({ event }: Props) => (
  <View className="bg-gray-100 border border-green-200 p-3 rounded-lg mb-2">
    <Text className="text-sm text-green-800">{event.attributes.description}</Text>
    <Text className="text-xs text-gray-500 mt-1">
      {formatDate(event.attributes.created_at)}
    </Text>
  </View>
);

export default CommentCard;
