export type UserAttributes = {
  id: string;
  email: string;
  name: string;
  document: string;
  type: string;
};

export type LoginResponseData = {
  id: string;
  type: string;
  attributes: UserAttributes;
};

export type LoginResponse = {
  token: string;
  data: LoginResponseData;
  [key: string]: any;
};

export type LoginFormData = {
  email: string;
  password: string;
};