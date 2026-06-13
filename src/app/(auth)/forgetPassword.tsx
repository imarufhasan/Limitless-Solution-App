import Button from '@/components/shared/Button';
import InputField from '@/components/shared/InputField';
import { Mail } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function forgetPassword() {
    const [email, setEmail] = React.useState("");
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="flex-1 px-5 "
                // contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text
                        style={{ fontFamily: "Inter_700Bold" }}
                        className="text-[28px]  text-[#0F0B18] leading-9 mb-2"
                    >Email Confirmation</Text>
                    <Text className="text-[#4F4F59] text-base  leading-6 font-normal pb-4">Enter Your Email For Verification</Text>
                </View>

                <InputField
                    label="Email"
                    Icon={Mail}
                    placeholder="jhon@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Button handlePress={() => { }} text="Send Verification Code" />
            </ScrollView>
        </SafeAreaView>
    )
}