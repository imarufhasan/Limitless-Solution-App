import { useNotification } from "@/components/NotificationProvider"; // adjust path
import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRegisterFcmTokenMutation } from "@/redux/features/home/fcmApi";
import { useAppDispatch } from "@/redux/hooks";
import { validateLoginForm } from "@/utils/validation";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

export default function Login() {
  const [email, setEmail] = useState("komodoc223@doefy.com");
  const [password, setPassword] = useState("123456");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [registerFcmToken] = useRegisterFcmTokenMutation();
  const { fcmToken } = useNotification();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    // Email and password validation
    const errors = validateLoginForm(email, password);
    setEmailError(errors.email ?? "");
    setPasswordError(errors.password ?? "");
    if (Object.keys(errors).length > 0) return;

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          token: result?.data?.accessToken,
          refreshToken: result?.data?.refreshToken,
          user: {
            email: result?.data?.email,
            role: result?.data?.role,
          },
        }),
      );

      // ✅ Login successful — register FCM token
      if (fcmToken) {
        const deviceType =
          Platform.OS === "android"
            ? "android"
            : Platform.OS === "ios"
              ? "ios"
              : "web";
        try {
          await registerFcmToken({ token: fcmToken, deviceType }).unwrap();
        } catch (fcmError) {
          console.log("❌ FCM register after login failed:", fcmError);
          // don't block login flow if this fails
        }
      }

      if (result.data.role === "customer") {
        router.replace("/(users)/home" as any);
      } else {
        router.replace("/(employee)/home" as any);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Login failed. Please check your credentials and try again.",
      );
    }
  };
  return (
    <SafeAreaView className="flex-1  bg-white">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
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
          onChangeText={(val) => {
            setEmail(val);
            if (emailError) setEmailError("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? (
          <Text className="text-red-500 text-xs mb-2 -mt-2">{emailError}</Text>
        ) : null}

        <InputField
          label="Password"
          Icon={Lock}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? (
          <Text className="text-red-500 text-xs mb-2 -mt-2">
            {passwordError}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => router.push("/(auth)/forgetPassword" as any)}
          className="self-end mb-4"
        >
          <Text className="text-[#EE2626]">Forget Password</Text>
        </TouchableOpacity>
        {/* Register Button */}
        <Button handlePress={handleLogin} text="Login" isLoading={isLoading} />

        {/* Login Link */}
        <View className="flex-row items-center justify-center">
          <Text className="text-sm text-gray-500">Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/register" as any)}
            className=""
          >
            <Text className="text-[#652D8B] font-medium">Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
