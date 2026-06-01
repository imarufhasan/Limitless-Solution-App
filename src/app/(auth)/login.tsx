import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (email === "user@gmail.com" && password === "1234") {
      router.push("/(users)/home" as any);
    } else if (email === "employee@gmail.com" && password === "1234") {
      router.push("/(employee)/home" as any);
    } else {
      alert("Invalid email or password");
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          {/* Logo */}
          <Image
            source={require("../../../assets/images/logo.png")}
            className="w-44 mx-auto my-8"
            resizeMode="contain"
          />
          <View className="mx-auto flex items-center mb-10">
            <Text
              style={{ fontFamily: "Inter_700Bold" }}
              className="text-[#652D8B] text-[28px] ">Login</Text>
            <Text className="text-[#4F4F59]">Sign in to continue to your Meal Planning</Text>

          </View>




          <InputField
            label="Email"
            Icon={Mail}
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />


          <InputField
            label="Password"
            Icon={Lock}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />


          <TouchableOpacity className="self-end mb-4">
            <Text className="text-[#EE2626]">Forget Password</Text>
          </TouchableOpacity>
          {/* Register Button */}
          <Button handlePress={handleLogin} text="Login" />

          {/* Login Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/register" as any)}
            className="items-center mb-8"
          >
            <Text className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Text className="text-[#652D8B] font-medium">Register</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}