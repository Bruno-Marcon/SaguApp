import { getToken } from '@//storage/secureToken';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { cleanAuthSession } from '../auth/authSession';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
const apiKey = Constants.expoConfig?.extra?.apiKey;

const getHeaders = async () => {
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey ?? '',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  console.log('[API] Headers preparados:', headers);
  return headers;
};

const handleResponse = async (response: Response) => {
  const status = response.status;
  const headers = response.headers;
  const text = await response.text();

  console.log('[API] Status da resposta:', status);
  console.log('[API] Headers da resposta:', headers);
  console.log('[API] Corpo bruto da resposta:', text);

  let data = null;
  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('[API] Erro ao fazer parse do JSON:', e);
      throw new Error('Resposta inválida da API');
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      console.warn('[API] Erro 401 - Sessão expirada, limpando sessão...');
      await cleanAuthSession();
      router.replace('/');
    }
    throw new Error(data?.message || response.statusText || 'Erro inesperado');
  }

  return data;
};

export const api = {
  get: async (endpoint: string) => {
    const headers = await getHeaders();
    const url = `${apiUrl}/api/v1${endpoint}`;
    console.log('[API GET] URL:', url);

    const res = await fetch(url, {
      method: 'GET',
      headers,
    });

    return handleResponse(res);
  },

  post: async (endpoint: string, body: object) => {
    const headers = await getHeaders();
    const url = `${apiUrl}/api/v1${endpoint}`;

    console.log('[API POST] URL:', url);
    console.log('[API POST] Headers:', headers);
    console.log('[API POST] Body:', body);

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  put: async (endpoint: string, body: object) => {
    const headers = await getHeaders();
    const url = `${apiUrl}/api/v1${endpoint}`;

    console.log('[API PUT] URL:', url);
    console.log('[API PUT] Body:', body);

    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  patch: async (endpoint: string, body: object) => {
    const headers = await getHeaders();
    const url = `${apiUrl}/api/v1${endpoint}`;

    console.log('[API PATCH] URL:', url);
    console.log('[API PATCH] Body:', body);

    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  delete: async (endpoint: string) => {
    const headers = await getHeaders();
    const url = `${apiUrl}/api/v1${endpoint}`;

    console.log('[API DELETE] URL:', url);

    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    return handleResponse(res);
  },
};