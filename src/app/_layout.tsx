import "../styles/global.css";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import * as Notifications from "expo-notifications";


import { registerForPushNotificationsAsync } from "../services/notification/registerForPushNotifications";
import { useNotificationListener } from "../services/notification/notificationsListner";
import { useNotificationWatcher } from "../hook/useNotificationWatcher";
import { ThemeProvider, useThemeApp } from "../components/organisms/list/themeContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { theme } = useThemeApp();

  useNotificationListener();
  useNotificationWatcher();

  useEffect(() => {
    async function prepare() {
      try {
        const fontPromise = Font.loadAsync({
          Inter: require("../assets/fonts/SpaceMono-Regular.ttf"),
        });

        const imagePromise = Asset.loadAsync([
          require("../assets/images/logo-ifc.png"),
        ]);

        await Promise.all([fontPromise, imagePromise]);
        await registerForPushNotificationsAsync();
      } catch (e) {
        console.warn("Erro ao carregar assets ou registrar notificações:", e);
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
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      onLayout={onLayoutRootView}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/home/page" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(panel)/profile/profile" options={{ headerShown: false }} /> */}
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

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
