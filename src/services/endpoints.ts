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
  users: {
  root: '/users',
  show: (id: string) => `/users/${id}`,
  },
  orientations: {
    root: '/orientations',
    show: (id: string) => `/orientations/${id}`,
  },
  document: {
    root: '/documents',
  },
  classrooms: {
    root: '/classrooms',
  },
  conditions: {
    root: '/conditions',
  },
  announcements: {
    root: '/announcements',
  },
};