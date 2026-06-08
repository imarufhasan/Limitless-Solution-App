import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  // 
  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({
        token: result?.data?.accessToken,
        refreshToken: result?.data?.refreshToken,
        user: {
          email: result?.data?.email,
          role: result?.data?.role,
        },
      }));
      if (result.data.role === 'customer') {
        router.replace("/(users)/home" as any);
      } else {
        router.replace("/(employee)/home" as any);

      }

    } catch (error : any) {
      console.error(error);
      toast.error(error?.data?.message || "Login failed. Please check your credentials and try again.");
    }
  }
  return (
    <SafeAreaView className="flex-1  bg-white">

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, justifyContent: 'center' }}
        enableOnAndroid={true}
        extraScrollHeight={5}
      >
        {/* Logo */}
        <Image
          source={require("../../../assets/images/logo.png")}
          className="w-44 mx-auto my-8"
          resizeMode="contain"
        />



        <InputField
          label="Email"
          Icon={Mail}
          placeholder="jhon@example.com"
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
        <Button handlePress={handleLogin} text="Login" isLoading={isLoading} />

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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}