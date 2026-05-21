import Button from '@/components/shared/Button'
import OTPInput, { OTPInputHandle } from '@/components/shared/OtpInput'
import React, { useRef } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const OtpVerification = () => {
  const otpRef = useRef<OTPInputHandle>(null);
    const [otp, setOtp] = React.useState("");

    const handleOtp = () => {
        console.log("OTP Entered:", otp);
        // Here you would typically verify the OTP with your backend
    }

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
                        Didn't receive the code? <Text className="text-[#652D8B]">Resend</Text>
                    </Text>
                </View>
                <Button text="Verify OTP" handlePress={handleOtp} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default OtpVerification