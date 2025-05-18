import React, { useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Event as OccurrenceEvent } from '../../../../types/event';
import CommentCard from '../../atoms/comments/commentCard';

interface Props {
  events: OccurrenceEvent[];
  loading?: boolean;
}

export const CommentList = ({ events, loading = false }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const latestEvent = [...events].reverse()[0];

  if (loading) return <ActivityIndicator size="large" color="#0E7C4A" />;
  if (!events.length) return <Text className="text-sm text-gray-500">Nenhum comentário.</Text>;

  return (
    <>
      {!showAll && latestEvent && <CommentCard event={latestEvent} />}

      {showAll &&
        [...events]
          .reverse()
          .map((event) => <CommentCard key={event.id} event={event} />)}

      {!showAll && events.length > 1 && (
        <TouchableOpacity onPress={() => setShowAll(true)}>
          <Text className="text-sm text-green-700 font-medium mb-2">Ver todos os comentários</Text>
        </TouchableOpacity>
      )}

      {showAll && (
        <TouchableOpacity onPress={() => setShowAll(false)}>
          <Text className="text-sm text-gray-500 font-medium mb-2">Mostrar menos</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CommentList;
