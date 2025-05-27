export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  dashboard: {
    stats: '/dashboard/stats',
    occurrences: '/occurrencies',
    orientations: '/orientations',
    events: '/events',
  },
  schedules: {
    root: '/schedules',
    show: (id: string) => `/schedules/${id}`,
    update: (id: string) => `/schedules/${id}`,
    create: '/schedules',
    availableSlots: '/schedules/available_slots',
  },
  students: {
    root: '/students',
    update: (id: string) => `/students/${id}`,
    show: (id: string) => `/students/${id}`,
  },
  reports: {
    root: '/reports',
  },
  authorizations: {
    root: '/authorizations',
    show: (id: string) => `/authorizations/${id}`,
  },
  occurrencies: {
    root: '/occurrencies',
  },
  events: {
    root: '/events',
    notifications: '/events/notifications',
  },
  classrooms: {
    root: '/classrooms'
  },
  users: {
  root: '/users',
  show: (id: string) => `/users/${id}`,
  responsible: '/users/responsible',
},
  orientations: {
    root: '/orientations',
    show: (id: string) => `/orientations/${id}`,
  },
  conditions: {
    root: '/conditions',
  },
  announcements: {
    root: '/announcements',
  },
  expoToken: {
    root: '/push_tokens'
  }
};