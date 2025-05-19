import React, { useEffect, useState, useCallback } from 'react'
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import { Occurrence } from '../../../../types/occurrence'
import { Event as OccurrenceEvent } from '../../../../types/event'
import { occurrenceService } from '@//services/occurrence/occurrenceService'
import { eventService } from '@//services/events/eventServices'

import CommentList from '../../molecules/comments/commentList'
import CommentInput from '../../atoms/input/commentInput'
import OccurrenceModalHeader from '../../molecules/header/occurrenceModalHeader'
import TagGroup from '../../molecules/badge/tagGroup'
import OccurrenceDetailsSectionModal from '../../molecules/section/occurence/OccurrenceDetailsSectionModal'

interface Props {
  visible: boolean
  onClose: () => void
  occurrenceId: string | null
  occurrence?: Occurrence | null
}

export default function OccurrenceDetailModal({
  visible,
  onClose,
  occurrenceId,
  occurrence: initialOccurrence
}: Props) {
  const [occurrence, setOccurrence] = useState<Occurrence | null>(initialOccurrence ?? null)
  const [events, setEvents] = useState<OccurrenceEvent[]>([])
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // 🔁 Lógica de carregamento separada
  const loadOccurrenceDetails = useCallback(async () => {
    if (!occurrenceId && !initialOccurrence) return
    setLoading(true)
    try {
      const occData = await occurrenceService.getById(occurrenceId!)
      const allEvents = await eventService.getAll()
      const relatedEvents = allEvents.data.filter(
        (e) => e.attributes.eventable_id === occData.id
      )
      setOccurrence(occData)
      setEvents(relatedEvents)
    } catch (err) {
      console.error('Erro ao buscar detalhes da ocorrência:', err)
    } finally {
      setLoading(false)
    }
  }, [occurrenceId, initialOccurrence])

  useEffect(() => {
    if (visible) loadOccurrenceDetails()
  }, [visible, loadOccurrenceDetails])

  // 🧠 Envio de comentário otimizado
  const handleSendComment = async () => {
    if (!comment.trim() || !occurrenceId) return
    setSubmitting(true)
    try {
      await eventService.create({
        eventable_id: occurrenceId,
        eventable_type: 'Occurrency',
        description: comment.trim()
      })
      setComment('')
      // 🔁 Apenas recarrega eventos
      const allEvents = await eventService.getAll()
      const relatedEvents = allEvents.data.filter(
        (e) => e.attributes.eventable_id === occurrenceId
      )
      setEvents(relatedEvents)
    } catch (err) {
      console.error('Erro ao enviar comentário:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible || (loading && !occurrence)) return null

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
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 16,
                width: '100%',
                maxHeight: '95%',
              }}
            >
              <OccurrenceModalHeader title={occurrence?.title ?? '-'} onClose={onClose} />

              <TagGroup
                status={occurrence?.status}
                kind={occurrence?.kind}
                severity={occurrence?.severity}
              />

              <ScrollView
                style={{ maxHeight: '65%', marginBottom: 8 }}
                showsVerticalScrollIndicator={false}
              >
                <OccurrenceDetailsSectionModal occurrence={occurrence!} />

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Comentários
                </Text>

                <CommentList events={events} loading={loading} />
                <CommentInput value={comment} onChangeText={setComment} />
              </ScrollView>

              <TouchableOpacity
                onPress={handleSendComment}
                disabled={submitting}
                style={{
                  backgroundColor: '#16A34A',
                  marginTop: 12,
                  paddingVertical: 12,
                  borderRadius: 12,
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  {submitting ? 'Enviando...' : 'Enviar Comentário'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
