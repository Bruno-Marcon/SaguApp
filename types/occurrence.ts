export type Occurrence = {
  id: string;
  title: string;
  description: string;
  kind?: string;
  status?: string;
  severity?: string;
  created_at: string;
  student_id: string;
};

export interface OccurrenceFilters {
  page?: number;
  severity?: string;
  status?: string;
}

export interface OccurrenceResponse {
  data: Occurrence[];
  meta?: {
    total?: number;
    current_page?: number;
    last_page?: number;
  };
}