export interface IncludedUser {
    id: string;
    type: 'user';
    attributes: {
      id: string;
      email: string;
      name: string;
      document: string;
      type: string;
    };
  }
  
  export interface IncludedStudent {
    id: string;
    type: 'student';
    attributes: {
      name: string;
      email: string;
      document: string;
      enrollment: string;
      situation: string | null;
    };
  }
  
  export interface IncludedParent {
    id: string;
    type: 'parent';
    attributes: {
      name: string;
      email: string;
      document: string;
      phone: string;
    };
  }

  export interface IncludedClassroom {
    id: string;
    type: 'classroom';
    attributes: {
      name: string;
      year: string;
      grade: string;
      course: string;
    };
  }

  export interface IncludedCondition {
    id: string;
    type: 'condition';
    attributes: {
      name: string;
      category: string;
      description: string;
    };
  }
  
  export interface IncludedEvent {
    id: string;
    type: 'event';
    attributes: {
      description: string;
      name: string;
      created_at: string;
      author_id: string;
      eventable_id: string;
      target_id?: string | null;
    };
    relationships: {
      author: { data: { id: string; type: string } };
      target: { data: { id: string; type: string } | null };
    };
  }
  
  export interface Meta {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_pages: number;
    total_count: number;
  }
  
  export interface Links {
    self: string;
    first: string;
    last: string;
  }
  