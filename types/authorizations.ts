import { IncludedEvent, IncludedStudent, IncludedUser } from "./share";

export interface Authorization {
  id: string;
  type: 'authorization';
  attributes: {
    description: string;
    date: string;
    created_at: string;
    status: 'pending' | 'approved' | 'refused';
  };
  relationships: {
    student: {
      data: {
        id: string;
        type: 'student';
      };
    };
    parent: {
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

export interface AuthorizationResponse {
  data: Authorization[];
  meta: {
    last_page: any;
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

export interface SingleAuthorizationResponse {
  data: Authorization;
  included?: Array<IncludedUser | IncludedStudent | IncludedEvent>;
}

export interface AuthorizationFilters {
  page?: number;
  status?: string;
  student_id?: string;
}


export interface CreateAuthorizationPayload {
  description: string;
  status: string;
  date: string;
  student_id: string;
}

export interface UpdateAuthorizationPayload {
  status?: string;
  description?: string;
  date: string;
  student_id?: string;
}