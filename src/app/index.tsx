import { useAppSelector } from "@/redux/hooks";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [ready, setReady] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

 

  if (ready) {
      if (token && user) {
      if (user?.role === 'staff') {
        return <Redirect href="/(employee)/home" />;
      }
      return <Redirect href="/(users)/home" />;
    }
    return <Redirect href="/onboarding" />;
  }


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