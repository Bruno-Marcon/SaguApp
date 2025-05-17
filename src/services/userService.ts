import { User } from '../../types/user'
import { api } from './api/api';
import { endpoints } from './endpoints';

export const getUsers = async (): Promise<User[]> => {
  return await api.get(endpoints.users.root);
};

export const getUserById = async (id: string): Promise<User> => {
  return await api.get(endpoints.users.show(id));
};
