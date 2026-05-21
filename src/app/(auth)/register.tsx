import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { router } from "expo-router";
import { Lock, Mail, Phone, User } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => { 
    router.push("/(auth)/OtpVerification" as any);
  };

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
            placeholder="Aaron"
            value={name}
            onChangeText={setName}
          />

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
            label="Mobile Number"
            Icon={Phone}
            placeholder="1XXXXXXXXX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <InputField
            label="Password"
            Icon={Lock}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Terms */}
          <TouchableOpacity
            onPress={() => setAgreed(!agreed)}
            className="flex-row items-center gap-2 mb-6"
          >
            <View
              className={`w-4 h-4 rounded border ${agreed
                ? "bg-[#652D8B] border-[#652D8B]"
                : "border-gray-400 bg-white"
                } items-center justify-center`}
            >
              {agreed && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-sm text-gray-500">
              I agree to{" "}
              <Text className="text-[#652D8B] font-medium">
                Terms & Conditions
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <Button handlePress={handleRegister} text="Register" />

          {/* Login Link */}
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login" as any)}
            className="items-center mb-8"
          >
            <Text className="text-sm text-gray-500">
              Already have an account?{" "}
              <Text className="text-[#652D8B] font-medium">Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}