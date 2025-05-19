import { IncludedUser, IncludedParent } from './included';
import { IncludedEvent, IncludedStudent } from './share';

export interface Schedule {
  starts_at: any;
  id: string;
  type: string;
  attributes: {
    starts_at: string;
    subject: string;
    area: string;
    status: string;
  };
  relationships?: {
    relator: {
      data: {
        id: string;
        type: string;
      };
    };
    parent: {
      data: {
        id: string;
        type: string;
      };
    };
    student: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface SingleScheduleResponse {
  data: Schedule;
  included?: Array<IncludedUser | IncludedParent | IncludedEvent | IncludedStudent>;
}

export interface ScheduleResponse {
  data: Schedule[];
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

export interface CreateSchedulePayload {
  starts_at: string;
  subject: string;
  area: string;
  status: string;
  student_id: string;
}

export interface UpdateSchedulePayload {
  area?: string;
  status?: string;
}

export interface AvailableSlotsResponse {
  data: {
    date: string;
    available_slots: string[];
  };
}