import BackButton from '@/components/shared/BackButton'
import Button from '@/components/shared/Button'
import InputField from '@/components/shared/InputField'
import { useChangePasswordMutation } from '@/redux/features/auth/authApi'
import { Lock } from 'lucide-react-native'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'

export default function ChangePasswordFromSettings() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const result = await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();


      toast.success(result?.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }}   edges={['top']}>
      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <BackButton title='Change Password' textColor='#652D8B' showBorder />

          <View className="mt-10">

            <InputField
              label="Old Password"
              Icon={Lock}
              placeholder="••••••••"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
            />
            <InputField
              label="New Password"
              Icon={Lock}
              placeholder="••••••••"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <InputField
              label="Confirm New Password"
              Icon={Lock}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button
              handlePress={handleChangePassword}
              text="Save"
              isLoading={isLoading}
              loadingText="Saving..."
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}