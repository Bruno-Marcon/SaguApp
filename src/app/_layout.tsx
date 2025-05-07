import "../styles/global.css"
import { Stack } from "expo-router"
import Toast from "react-native-toast-message"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { Asset } from "expo-asset"
import { useEffect, useState, useCallback } from "react"
import { View } from "react-native"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        const fontPromise = Font.loadAsync({
          Inter: require("../assets/fonts/SpaceMono-Regular.ttf"),
        })

        const imagePromise = Asset.loadAsync([
          require("../assets/images/logo-ifc.png"),
        ])

        await Promise.all([fontPromise, imagePromise])
      } catch (e) {
        console.warn("Erro ao carregar assets:", e)
      } finally {
        setAppIsReady(true)
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
        <Stack.Screen name="(panel)/home/page" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </View>
  )
}
