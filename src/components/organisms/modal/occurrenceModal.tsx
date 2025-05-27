import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Occurrence, updateOccurrencePayload } from '../../../../types/occurrence';
import { Event as OccurrenceEvent } from '../../../../types/event';
import { occurrenceService } from '@//services/occurrence/occurrenceService';
import { eventService } from '@//services/events/eventServices';

import CommentList from '../../molecules/comments/commentList';
import CommentInput from '../../atoms/input/commentInput';
import OccurrenceModalHeader from '../../molecules/header/occurrenceModalHeader';
import TagGroup from '../../molecules/badge/tagGroup';
import OccurrenceDetailsSectionModal from '../../molecules/section/occurence/OccurrenceDetailsSectionModal';
import { showToast } from '@//utils/toastUtiles';

interface Props {
  visible: boolean;
  onClose: () => void;
  occurrenceId: string | null;
  occurrence?: Occurrence | null;
  onUpdate?: () => Promise<void>;
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

  const loadOccurrenceDetails = useCallback(async () => {
    if (!occurrenceId && !initialOccurrence) return;
    setLoading(true);
    try {
      const occData = await occurrenceService.getOccurrency(occurrenceId!);

      const allEvents = await eventService.getAll();
      const relatedEvents = allEvents.data.filter(
        (e) => e.attributes.eventable_id === occData.id
      );

      setOccurrence(occData);
      setEvents(relatedEvents);
    } catch (err) {
      console.error('Erro ao buscar detalhes da ocorrência:', err);
      showToast.error('Erro ao carregar dados da ocorrência');
    } finally {
      setLoading(false);
    }
  }, [occurrenceId, initialOccurrence]);

  useEffect(() => {
    if (visible) loadOccurrenceDetails();
  }, [visible, loadOccurrenceDetails]);

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
      await loadOccurrenceDetails();
      showToast.success('Comentário adicionado com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      showToast.error('Erro ao adicionar comentário.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id: string, updateData: updateOccurrencePayload) => {
    try {
      await occurrenceService.updateOccurrence(id, updateData);
      await loadOccurrenceDetails();
      showToast.success('Ocorrência atualizada com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar ocorrência:', err);
      showToast.error('Erro ao atualizar ocorrência.');
    }
  };

  if (!visible || (loading && !occurrence)) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 bg-black/40">
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl px-5 pt-5 pb-4 w-full max-h-[95%]">
              <OccurrenceModalHeader
                title={occurrence?.attributes?.title ?? '-'}
                onClose={onClose}
              />

              <TagGroup
                status={occurrence?.attributes?.status}
                kind={occurrence?.attributes?.kind}
                severity={occurrence?.attributes?.severity}
              />

              <ScrollView
                className="max-h-[65%] mb-2"
                showsVerticalScrollIndicator={false}
              >
                {occurrence && (
                  <OccurrenceDetailsSectionModal
                    occurrence={occurrence}
                    onUpdate={handleUpdate}
                  />
                )}

                <Text className="text-base font-semibold text-gray-700 mb-2">
                  Comentários
                </Text>

                <CommentList events={events} loading={loading} />
                <CommentInput value={comment} onChangeText={setComment} />
              </ScrollView>

              <TouchableOpacity
                onPress={handleSendComment}
                disabled={submitting}
                className={`bg-green-600 mt-2 py-3 rounded-xl ${
                  submitting ? 'opacity-60' : ''
                }`}
              >
                <Text className="text-white font-semibold text-center">
                  {submitting ? 'Enviando...' : 'Enviar Comentário'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
