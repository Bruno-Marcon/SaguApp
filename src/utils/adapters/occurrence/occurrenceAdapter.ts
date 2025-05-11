import { Occurrence } from "@//services/occurrence/occurrenceService"

export interface OccurrenceItem {
  class: string
  date: string
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
  title: occurrence.attributes.title,
  description: occurrence.attributes.description,
  isNew: occurrence.attributes.status === "new",
  authorName: "Desconhecido",
  status: occurrence.attributes.status,
  category: occurrence.attributes.kind,
  createdAt: occurrence.attributes.created_at,
  class:" C",
  date: "D",
}
}
