import { Image } from "expo-image";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (ready) return <Redirect href="./onboarding" />;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-48 h-24"
        contentFit="contain"
      />
    </View>
  );
}