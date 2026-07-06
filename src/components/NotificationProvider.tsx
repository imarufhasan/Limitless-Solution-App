import { useRegisterFcmTokenMutation } from "@/redux/features/home/fcmApi";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform } from "react-native";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";

interface NotificationContextType {
  fcmToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [registerFcmToken] = useRegisterFcmTokenMutation();
  const lastRegisteredTokenRef = useRef<string | null>(null);

  const deviceType: "android" | "ios" | "web" =
    Platform.OS === "android"
      ? "android"
      : Platform.OS === "ios"
        ? "ios"
        : "web";

  const sendTokenToBackend = async (token: string) => {
    if (!token || lastRegisteredTokenRef.current === token) return;
    lastRegisteredTokenRef.current = token;
    try {
      await registerFcmToken({ token, deviceType }).unwrap();
      console.log("✅ FCM token registered with backend");
    } catch (err) {
      console.log("❌ FCM token register API failed: ", err);
    }
  };

  useEffect(() => {
    // ✅ FCM Token নাও
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("✅ FCM Token in context 4: ", token);
        setFcmToken(token);
        if (token) sendTokenToBackend(token);
      })
      .catch((err) => {
        console.log("❌ FCM Token error 5: ", err);
        setError(err);
      });

    // ✅ Token refresh হলে আপডেট নাও
    const unsubscribeTokenRefresh = messaging().onTokenRefresh((newToken) => {
      console.log("🔄 FCM Token refreshed 6: ", newToken);
      setFcmToken(newToken);
      sendTokenToBackend(newToken);
    });

    // ✅ Foreground notification listener (expo)
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🔔 Expo Foreground Notification3: ", notification);
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👆 Notification tapped2: ", response);
        // TODO: navigate based on response.notification.request.content.data
      });

    const unsubscribeMessage = messaging().onMessage(async (remoteMessage) => {
      console.log("🔔 Firebase Foreground Message1: ", remoteMessage);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification?.title ?? "New Notification",
          body: remoteMessage.notification?.body ?? "",
          data: remoteMessage.data ?? {},
        },
        trigger: null,
      });
    });

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeMessage();
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ fcmToken, notification, error }}>
      {children}
    </NotificationContext.Provider>
  );
};
