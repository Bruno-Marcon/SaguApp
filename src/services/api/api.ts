import { AlertCircle, Clock } from 'lucide-react-native';
import { ReactNode } from 'react';

export interface Grade {
  subject: string;
  grade: string;
}

export interface ComunicadosResponse {
  type: 'alerta' | 'info';
  title: string;
  subtitle: string;
}

export interface Comunicado extends ComunicadosResponse {
  icon: ReactNode;
}

const BASE_URL = 'http://localhost:3001';

export async function fetchGrades(): Promise<Grade[]> {
  const response = await fetch(`${BASE_URL}/grades`);
  if (!response.ok) throw new Error('Erro ao buscar notas');
  return await response.json();
}

export async function fetchComunicados(): Promise<Comunicado[]> {
  const response = await fetch(`${BASE_URL}/comunicados`);
  if (!response.ok) throw new Error('Erro ao buscar comunicados');
  const data: ComunicadosResponse[] = await response.json();

}
