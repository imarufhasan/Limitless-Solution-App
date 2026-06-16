import BackButton from '@/components/shared/BackButton'
import { useContentManagementQuery } from '@/redux/features/auth/authApi'
import React from 'react'
import { ActivityIndicator, ScrollView, useWindowDimensions, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TermsCondition() {
  const { data, isLoading } = useContentManagementQuery("terms_and_condition")
  const { width } = useWindowDimensions();
  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#F8F6FA' }}
        edges={['top']}
      >
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#652D8B" />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackButton title='Terms & Conditions' textColor='#652D8B' showBorder />
          <View className="bg-[#F0EAF3] rounded-md shadow-xl p-4 mt-4 flex-1 mb-10">
            <RenderHTML
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