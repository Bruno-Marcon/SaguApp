import { User } from '../../types/user';
import { api } from './api/api';
import { endpoints } from './endpoints';

export const userService = {
  getAll: async (): Promise<User[]> => {
    const res = await api.get(endpoints.users.root);

    return res.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      email: item.attributes.email,
      role: item.attributes.role,
    })) as User[];
  },

  getById: async (id: string): Promise<User> => {
    const res = await api.get(endpoints.users.show(id));

    return {
      id: res.data.id,
      name: res.data.attributes.name,
      email: res.data.attributes.email,
      role: res.data.attributes.role,
    } as User;
  },

  getResponsibles: async (): Promise<User[]> => {
    const res = await api.get(endpoints.users.responsible);

    return res.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      email: item.attributes.email,
      role: item.attributes.role,
    })) as User[];
  },
};
