export async function sendPushNotification(
  to: string,
  title: string,
  body: string,
  data: Record<string, any> = {}
) {
  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        sound: 'default',
        title,
        body,
        data,
      }),
    });

    const result = await response.json();
    console.log('[NOTIFICATION] Resultado do envio:', result);
  } catch (error) {
    console.error('[NOTIFICATION] Falha ao enviar push:', error);
  }
}