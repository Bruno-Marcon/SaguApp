import { Occurrence } from "@//services/occurrence/occurrenceService"

export interface OccurrenceItem {
  id:string
  title: string
  description: string
  isNew?: boolean
  authorName?: string
  status?:string
  category?: string
  createdAt?: Date | string
}

export const mapOccurrenceToItem = (occurrence: Occurrence): OccurrenceItem => {
  return {
    id: occurrence.id ?? '',
    title: occurrence.attributes.title ?? 'Sem título',
    description: occurrence.attributes.description ?? 'Sem descrição',
    isNew: occurrence.attributes.status === "new",
    authorName: "Desconhecido",
    status: occurrence.attributes.status ?? 'desconhecido',
    category: occurrence.attributes.kind ?? 'Não especificado',
    createdAt: occurrence.attributes.created_at ?? new Date().toISOString(),
  }
}
