import {
  IncludedClassroom,
  IncludedUser,
  IncludedParent,
  IncludedStudent,
  IncludedEvent,
  Meta,
  Links,
  IncludedCondition
} from './share';

export interface StudentListItem {
  relationships: any;
  id: string;
  type: 'student';
  attributes: {
    name: string;
    email: string;
    document: string;
    enrollment: string;
    situation: string;
  };
}

export interface StudentResponse {
  data: StudentListItem[];
  meta: Meta;
  links: Links;
}

export interface Student {
  id: string;
  type: 'student';
  attributes: {
    name: string;
    report_url: string;
    email: string;
    document: string;
    enrollment: string;
    situation: string;
    phone: string | null;
    gender: string | null;
    birthdate: string | null;
  };
  relationships: {
    classroom: { data: { id: string; type: 'classroom' } | null };
    parent: { data: { id: string; type: 'parent' } | null };
    occurrencies: { data: { id: string; type: 'occurrency' }[] };
    orientations: { data: { id: string; type: 'orientation' }[] };
    authorizations: { data: { id: string; type: 'authorization' }[] };
    schedules: { data: { id: string; type: 'schedule' }[] };
    documents: { data: { id: string; type: 'document' }[] };
  };
}

export type IncludedResource =
  | IncludedUser
  | IncludedStudent
  | IncludedParent
  | IncludedEvent
  | IncludedClassroom
  | IncludedCondition;

export interface StudentDetailResponse {
  data: Student;
  included?: IncludedResource[];
}

export interface UpdateStudentPayload {
  email?: string;
  situation?: string;
  classroom_id?: string;
  phone?: string;
}