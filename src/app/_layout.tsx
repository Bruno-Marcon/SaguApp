import "../styles/global.css";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message"; // <- Importa o Toast

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/signin/page"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(panel)/home/page"
          options={{ headerShown: false }}
        />
      </Stack>
      <Toast />
    </>
  );
}
