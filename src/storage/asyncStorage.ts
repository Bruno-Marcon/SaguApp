import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'read_notification_ids';

export async function addReadNotificationId(id: string) {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const ids = stored ? JSON.parse(stored) : [];

  if (!ids.includes(id)) {
    ids.push(id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

export async function getReadNotificationIds(): Promise<string[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
