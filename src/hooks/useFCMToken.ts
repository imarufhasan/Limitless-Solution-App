import { useRegisterFcmTokenMutation } from "@/redux/features/home/fcmApi";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

export function useFcmRegister(isAuthenticated: boolean) {
  const [registerFcmToken] = useRegisterFcmTokenMutation();
  const lastTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const register = async (token: string) => {
      if (lastTokenRef.current === token) return; // avoid duplicate calls
      lastTokenRef.current = token;

      const deviceType: "web" | "android" | "ios" =
        Platform.OS === "android"
          ? "android"
          : Platform.OS === "ios"
            ? "ios"
            : "web";

      try {
        await registerFcmToken({ token, deviceType }).unwrap();
      } catch (err) {
        console.log("FCM register failed:", err);
      }
    };

    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        finalStatus = newStatus;
      }
      if (finalStatus !== "granted") return;

      const tokenData = await Notifications.getDevicePushTokenAsync();
      await register(tokenData.data);
    })();

    // Listen for token refresh (e.g. FCM token rotation)
    const sub = Notifications.addPushTokenListener((tokenData) => {
      register(tokenData.data);
    });

    return () => sub.remove();
  }, [isAuthenticated, registerFcmToken]);
}
