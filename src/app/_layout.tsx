import { NotificationProvider } from "@/components/NotificationProvider";
import { persistor, store } from "@/redux/store";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner-native";

SplashScreen.preventAutoHideAsync();

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(
    "📩 Firebase Background Message: ",
    JSON.stringify(remoteMessage, null, 2),
  );
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <KeyboardProvider>
                <StatusBar style="dark" />
                {(fontsLoaded || fontError) && (
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="onboarding/index" />
                    <Stack.Screen name="(settings)" />
                    <Stack.Screen name="chat" />
                  </Stack>
                )}
                <Toaster />
              </KeyboardProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </NotificationProvider>
      </PersistGate>
    </Provider>
  );
}
