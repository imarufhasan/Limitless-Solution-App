import Button from '@/components/shared/Button';
import InputField from '@/components/shared/InputField';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function forgetPassword() {
    const [email, setEmail] = React.useState("");

    const handleForgetPassword = ()=>{
        router.push({
              pathname: "/(auth)/OtpVerification",
              params: { 
                email,
                purpose : "forget-password"
              },
            } as any);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-5">

                {/* Top Content */}
                <View className="pt-5">
                    <Text
                        style={{ fontFamily: "Inter_700Bold" }}
                        className="text-[28px] text-[#0F0B18] leading-9 mb-2"
                    >
                        Email Confirmation
                    </Text>

                    <Text className="text-[#4F4F59] text-base leading-6 font-normal">
                        Enter Your Email For Verification
                    </Text>
                </View>

                {/* Middle Email Field */}
                <View className="mt-10">
                    <InputField
                        label="Email"
                        Icon={Mail}
                        placeholder="jhon@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Bottom Button */}
                <View className="pb-5">
                    <Button
                        handlePress={() => handleForgetPassword()}
                        text="Send Verification Code"
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}