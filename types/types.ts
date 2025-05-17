export type User = {
  id: string
  type: 'user'
  attributes: {
    id: string
    name: string
    email: string
    document: string
    type: string
    role: string | null
  }
}

export type Student = {
  id: string
  type: 'student'
  attributes: {
    name: string
    email: string
    document: string
    enrollment: string
    situation: string
    phone: string | null
    gender: string | null
    birthdate: string | null
    report_url: string | null
  }
  relationships: {
    classroom: {
      data: {
        id: string
        type: string
      }
    }
    parent: { data: any }
    occurrencies: { data: { id: string, type: string }[] }
    authorizations: { data: any[] }
    orientations: { data: any[] }
    schedules: { data: any[] }
    documents: { data: any[] }
    conditions: { data: any[] }
  }
}

export type Occurrency = {
  id: string
  type: 'occurrency'
  attributes: {
    title: string
    description: string
    kind: string
    status: string
    severity: string
    created_at: string
    private: boolean
  }
  relationships: {
    student: { data: { id: string, type: 'student' } }
    relator: { data: { id: string, type: 'user' } }
    responsible: { data: { id: string, type: 'user' } }
    events: { data: any[] }
  }
}

export type IncludedData = (User | Student)

export type OccurrencyDetailsResponse = {
  data: Occurrency
  included: IncludedData[]
}
