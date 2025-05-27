import { IncludedUser, IncludedStudent, IncludedEvent } from './share';

export interface Occurrence {
  id: string;
  type: 'occurrency';
  attributes: {
    title: string;
    description: string;
    created_at: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    kind: 'health' | 'discipline' | 'administrative' | 'other';
    severity: 'low' | 'normal' | 'medium' | 'high';
    private: boolean;
  };
  relationships: {
    student: {
      data: {
        id: string;
        type: 'student';
      };
    };
    relator: {
      data: {
        id: string;
        type: 'user';
      };
    };
    responsible: {
      data: {
        id: string;
        type: 'user';
      };
    };
    events: {
      data: {
        id: string;
        type: 'event';
      }[];
    };
  };
}

export interface OccurrenceResponse {
  data: Occurrence[];
  meta: {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_pages: number;
    total_count: number;
  };
  links: {
    self: string;
    first: string;
    last: string;
  };
}

export interface SingleOccurrenceResponse {
  data: Occurrence;
  included?: Array<IncludedUser | IncludedStudent | IncludedEvent>;
}

export interface OccurrenceFilters {
  page?: number;
  severity?: string;
  status?: string;
}

export interface CreateOccurrencePayload {
  title: string;
  description: string;
  kind: string;
  severity: string;
  status: string;
  student_id: string;
  responsible_id: string;
  private?: boolean;
}

export interface updateOccurrencePayload {
  status?: string;
  responsible_id?: string;
  kind?: string;
  severity?: string;
  private?: boolean;
}
