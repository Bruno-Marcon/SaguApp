export interface Event {
    id: string;
    type: string;
    attributes: {
      description: string;
      created_at: string;
      author_id: string;
      eventable_id: string;
      target_id: string;
    };
  }
  
  export interface EventsResponse {
    data: Event[];
    meta: {
      current_page: number;
      next_page: number | null;
      prev_page: number | null;
      total_pages: number;
      total_count: number;
    };
  }