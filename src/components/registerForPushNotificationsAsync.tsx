import messaging from "@react-native-firebase/messaging";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync(): Promise<string> {
  // ✅ Android notification channel সেটআপ
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(
      "fcm_fallback_notification_channel",
      {
        name: "General",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      },
    );
  }

  if (!Device.isDevice) {
    throw new Error("Must use physical device for push notifications");
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    throw new Error("Firebase notification permission not granted!");
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error("Expo notification permission not granted!");
  }

  const fcmToken = await messaging().getToken();

  if (!fcmToken) {
    throw new Error("Failed to get FCM token!");
  }

  //console.log("✅ FCM Token req push noti:", fcmToken);
  return fcmToken;
}
