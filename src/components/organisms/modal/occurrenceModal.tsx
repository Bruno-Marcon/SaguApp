import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import { Occurrence } from '../../../../types/occurrence';
import { Event as OccurrenceEvent } from '../../../../types/event';

import { occurrenceService } from '@//services/occurrence/occurrenceService';
import { eventService } from '@//services/events/eventServices';


import CommentList from '../../molecules/comments/commentList';
import CommentInput from '../../atoms/input/commentInput';
import OccurrenceModalHeader from '../../molecules/header/occurrenceModalHeader';
import TagGroup from '../../molecules/badge/tagGroup';
import OccurrenceDetailsSectionModal from '../../molecules/section/occurence/OccurrenceDetailsSectionModal';

interface Props {
  visible: boolean;
  onClose: () => void;
  occurrenceId: string | null;
  occurrence?: Occurrence | null;
}

export default function OccurrenceDetailModal({
  visible,
  onClose,
  occurrenceId,
  occurrence: initialOccurrence,
}: Props) {
  const [occurrence, setOccurrence] = useState<Occurrence | null>(initialOccurrence ?? null);
  const [events, setEvents] = useState<OccurrenceEvent[]>([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!visible || (!occurrenceId && !initialOccurrence)) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const occData = await occurrenceService.getById(occurrenceId!);
        const allEvents = await eventService.getAll();
        const filteredEvents = allEvents.data.filter(
          (e) => e.attributes.eventable_id === occData.id
        );
        setOccurrence(occData);
        setEvents(filteredEvents);
      } catch (err) {
        console.error('Erro ao buscar detalhes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [visible, occurrenceId, initialOccurrence]);

  const handleSendComment = async () => {
    if (!comment.trim() || !occurrenceId) return;
    setSubmitting(true);
    try {
      await eventService.create({
        eventable_id: occurrenceId,
        eventable_type: 'Occurrency',
        description: comment.trim(),
      });
      setComment('');
      const allEvents = await eventService.getAll();
      const filteredEvents = allEvents.data.filter(
        (e) => e.attributes.eventable_id === occurrenceId
      );
      setEvents(filteredEvents);
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible || (loading && !occurrence)) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <View className="bg-white rounded-3xl p-5 w-full max-h-[90%]">
          <OccurrenceModalHeader title={occurrence?.title ?? '-'} onClose={onClose} />

          <TagGroup
            status={occurrence?.status}
            kind={occurrence?.kind}
            severity={occurrence?.severity}
          />

          <ScrollView className="mb-2">
            <OccurrenceDetailsSectionModal occurrence={occurrence!} />

            <Text className="text-base font-semibold text-gray-700 mb-2">Comentários</Text>
            <CommentList events={events} loading={loading} />

            <CommentInput value={comment} onChangeText={setComment} />
          </ScrollView>

          <TouchableOpacity
            onPress={handleSendComment}
            disabled={submitting}
            className="bg-green-600 mt-2 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold text-center">
              {submitting ? 'Enviando...' : 'Enviar Comentário'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
