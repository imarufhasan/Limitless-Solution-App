import { Stack } from "expo-router";
export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="changePasswordFromSettings" />
      <Stack.Screen name="about-us" />
      <Stack.Screen name="privacyPolicy" />
      <Stack.Screen name="termsCondition" />
    </Stack>
  );
}
