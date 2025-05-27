export interface Class {
  id: string;
  type: string;
  attributes: {
    name: string;
    course: string;
    year: string;
    grade: string;
    external_id: number;
    created_at: string;
  };
}
