import BackButton from '@/components/shared/BackButton'
import { PrivacyPolicySkeleton } from '@/components/shared/PrivacyPolicySkeleton'
import { useContentManagementQuery } from '@/redux/features/auth/authApi'
import React from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'
import RenderHtml from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function PrivacyPolicy() {

  const { data, isLoading } = useContentManagementQuery("privacy_policy")
  const { width } = useWindowDimensions();

  // 
   if (isLoading) {
    return (
     <PrivacyPolicySkeleton/>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackButton title='Privacy Policy ' textColor='#652D8B' showBorder />
          <View className="bg-[#F0EAF3] rounded-md shadow-xl p-4 mt-4 flex-1 mb-10">
            <RenderHtml
              contentWidth={width}
              source={{
                html: data?.data?.content || '',
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}