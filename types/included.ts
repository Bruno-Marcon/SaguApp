export interface IncludedUser {
  id: string;
  type: "user";
  attributes: {
    id: string;
    email: string;
    name: string;
    document: string;
    type: string;
  };
}

export interface IncludedParent {
  id: string;
  type: "parent";
  attributes: {
    name: string;
    email: string;
    document: string;
  };
  relationships: {
    students: {
      data: Array<{
        id: string;
        type: string;
      }>;
    };
  };
}

export type IncludedEntity = IncludedUser | IncludedParent;
