export type Occurrence = {
  id: string;
  title: string;
  description: string;
  kind?: string;
  status?: string;
  severity?: string;
  created_at: string;
  student_id: string;
  student_name?: string;
  relator_name?: string;
  responsible_name?: string;
  private?: boolean
};

export interface OccurrenceFilters {
  page?: number;
  severity?: string;
  status?: string;
  student_id?: string;
}

export interface OccurrenceResponse {
  data: Occurrence[];
  meta?: {
    total?: number;
    current_page?: number;
    last_page?: number;
    total_pages?: number;
  };
}