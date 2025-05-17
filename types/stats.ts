export interface StatsData {
  total_students: number;
  scheduled_appointments: number;
  pending_occurrencies: number;
  pending_orientations: number;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: any;
  subtext: string;
}