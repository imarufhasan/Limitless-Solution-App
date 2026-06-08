import Button from '@/components/shared/Button'
import OTPInput, { OTPInputHandle } from '@/components/shared/OtpInput'
import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/features/auth/authApi'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useRef } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'

const OtpVerification = () => {
    const { email } = useLocalSearchParams<{ email: string }>();
    const otpRef = useRef<OTPInputHandle>(null);
    const [otp, setOtp] = React.useState("");
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    const handleOtp = async () => {
        try {
            const result = await verifyOtp({ email, otp }).unwrap();
            console.log( "result",result)
            toast.success(result?.message || "OTP verified successfully! Please login.");
            router.replace("/(auth)/login" as any);
        } catch (error: any) {
            toast.error(error?.data?.message || "OTP verification failed");
        }
    }


    const handleResend = async () => {
        try {
            const result = await resendOtp({ email }).unwrap();
            toast.success(result?.message || "OTP resent successfully!");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to resend OTP");
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="flex-1 px-5 "
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center px-8">
                    <Text
                        style={{ fontFamily: "Inter_700Bold" }}
                        className="text-[32px]  text-[#0F0B18] text-center leading-9 mb-2">
                        OTP Verification
                    </Text>
                    <Text className="text-[#4F4F59] text-base text-center leading-6 font-normal pb-4">
                        Enter the 6 digits code that you received on your email address
                    </Text>
                </View>

                <View className="items-center py-2">
                    <OTPInput
                        ref={otpRef}
                        length={6}
                        onComplete={setOtp}
                        onChange={(digits) => setOtp(digits.join(""))}
                    />
                </View>
                <View className="items-center py-4 mt-20">
                    <Text className="text-[#4F4F59] text-sm">
                        Didn't receive the code?   <TouchableOpacity onPress={handleResend} disabled={isResending}>
                            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#652D8B]">
                                {isResending ? "Sending..." : "Resend"}
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <Button text="Verify OTP" handlePress={handleOtp} isLoading={isLoading} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default OtpVerification