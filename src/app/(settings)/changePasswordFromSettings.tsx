import BackButton from '@/components/shared/BackButton'
import Button from '@/components/shared/Button'
import InputField from '@/components/shared/InputField'
import { Lock } from 'lucide-react-native'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChangePasswordFromSettings() {
  const [password, setPassword] = React.useState("")

  const handleChangePasswrod = () => {
    // Handle password change logic here
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackButton title='Change Password' textColor='#652D8B' showBorder />

          <View className="mt-10">
            <InputField
              label="Old Password"
              Icon={Lock}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <InputField
              label="New Password"
              Icon={Lock}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <InputField
              label="Confirm New Password"
              Icon={Lock}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button handlePress={handleChangePasswrod} text="Save" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}  