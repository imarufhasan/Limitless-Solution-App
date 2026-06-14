import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { validationRegisterForm } from "@/utils/validation";
import { router } from "expo-router";
import { Lock, Mail, Phone, User } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [agreedError, setAgreedError] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    // All Filed Validation
    const errors = validationRegisterForm(name, email, phone, password, agreed)
    setNameError(errors.name ?? "");
    setEmailError(errors.email ?? "");
    setPhoneError(errors.phone ?? "");
    setPasswordError(errors.password ?? "");
    setAgreedError(errors.agreed ?? "");
    if (Object.keys(errors).length > 0) return;
    try {
      const result = await register({
        name,
        email,
        password,
        phoneNumber: phone,
      }).unwrap();

      toast.success(result?.message || "Registration successful! Please verify your email.");
      // console.log(result?.message )

      router.push({
        pathname: "/(auth)/OtpVerification",
        params: {
          email,
          purpose: "signup"
        },
      } as any);

    } catch (error: any) {
      // console.error("Register error:", error);
      toast.error(error?.data?.message || "Registration failed. Please try again.");
      //  console.log(error?.data?.message )
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, justifyContent: 'center' }}
        enableOnAndroid={true}
        extraScrollHeight={5}
      >

        {/* Header */}
        <Text className="text-2xl font-bold text-[#652D8B]  mt-2">
          Create Account
        </Text>
        <Text className="text-sm text-[#4F4F59]">
          Join Scrap-Mate today
        </Text>

        {/* Logo */}
        <Image
          source={require("../../../assets/images/logo.png")}
          className="w-32"
          resizeMode="contain"
        />

        {/* Name */}

        <InputField
          label="Name"
          Icon={User}
          placeholder="Jhon"
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text className="text-red-500 text-xs mb-2 -mt-1">{nameError}</Text> : null}

        <InputField
          label="Email"
          Icon={Mail}
          placeholder="jhon@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text className="text-red-500 text-xs mb-2 -mt-1">{emailError}</Text> : null}

        <InputField
          label="Mobile Number"
          Icon={Phone}
          placeholder="1XXXXXXXXX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        {phoneError ? <Text className="text-red-500 text-xs mb-2 -mt-1">{phoneError}</Text> : null}

        <InputField
          label="Password"
          Icon={Lock}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text className="text-red-500 text-xs mb-2 -mt-1">{passwordError}</Text> : null}

        {/* Terms */}
        <View className="flex-row items-center  mb-6">
          <TouchableOpacity
            onPress={() => setAgreed(!agreed)}
            className=""
          >
            <View
              className={`w-4 h-4 rounded border mr-2 ${agreed
                ? "bg-[#652D8B] border-[#652D8B]"
                : "border-gray-400 bg-white"
                } items-center justify-center`}
            >
              {agreed && <Text className="text-white text-xs">✓</Text>}
            </View>
          </TouchableOpacity>
          <Text className="text-sm text-gray-500">
            I agree to{" "}
          </Text>
          <TouchableOpacity onPress={()=> router.push("/(settings)/termsCondition")}>
            <Text className="text-[#652D8B] font-medium">
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
        {agreedError ? <Text className="text-red-500 text-xs mb-2 -mt-4">{agreedError}</Text> : null}

        {/* Register Button */}
        <Button
          handlePress={handleRegister}
          text="Register"
          isLoading={isLoading}
          loadingText="Creating account"
        />

        {/* Login Link */}
        <View className="flex-row items-center justify-center mb-2">
          <Text className="text-sm text-gray-500">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login" as any)}
            className=""
          >
            <Text className="text-[#652D8B] font-medium">Login</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}