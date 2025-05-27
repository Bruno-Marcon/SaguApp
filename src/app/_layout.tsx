import "../styles/global.css";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import * as Notifications from "expo-notifications";
import { useColorScheme } from "nativewind";

import { registerForPushNotificationsAsync } from "../services/notification/registerForPushNotifications";
import { useNotificationListener } from "../services/notification/notificationsListner";
import { useNotificationWatcher } from "../hook/useNotificationWatcher";
import { ThemeProvider, useThemeApp } from "../components/organisms/list/themeContext";

// Configuração global de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

// Impede o splash screen de fechar automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}

function LayoutContent() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { theme } = useThemeApp();
  const { setColorScheme } = useColorScheme();

  useNotificationListener();
  useNotificationWatcher();

  // Sincroniza o tema do ThemeProvider com NativeWind
  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  useEffect(() => {
    async function prepare() {
      try {
        // Carregar fontes e imagens
        const fontPromise = Font.loadAsync({
          Inter: require("../assets/fonts/SpaceMono-Regular.ttf"),
        });

        const imagePromise = Asset.loadAsync([
          require("../assets/images/logo-ifc.png"),
        ]);

        await Promise.all([fontPromise, imagePromise]);

        // Registrar push notifications
        await registerForPushNotificationsAsync();
      } catch (e) {
        console.warn("Erro ao carregar assets ou notificações:", e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View
      className="flex-1 bg-white dark:bg-black"
      onLayout={onLayoutRootView}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/home/page" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/occurences/occurences" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/schedules/page" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/authorization/page" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/reportCard/page" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/settings/page" options={{ headerShown: false }} />
      </Stack>

      <Toast />
    </View>
  );
}
