import BackButton from '@/components/shared/BackButton'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackButton title='Privacy Policy ' textColor='#652D8B' showBorder />
          <View className="bg-[#F0EAF3] rounded-md shadow-xl p-4 mt-4 flex-1">
            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm text-[#0F0B18] leading-6">
              gravida elit enim. lobortis, ex orci lobortis, Donec orci elit felis, luctus ultrices odio tincidunt cursus elit ex nisi vehicula, Morbi Nunc Morbi venenatis sollicitudin. tortor. dui non quam dui. nibh tortor. sit viverra maximus ipsum

              massa tincidunt massa non, Ut ex lobortis, nulla, sit orci Nam massa viverra venenatis massa placerat In viverra laoreet massa Lorem at elit scelerisque Quisque viverra id ipsum risus quam Lorem id quis ultrices vel placerat dui. elit nec

              lobortis, vehicula, tempor Quisque sed felis, vitae Sed varius dolor volutpat in sed non, massa sit porta nisi ex. porta nulla, turpis efficitur. Nunc dolor dolor id non est. lacus, varius ipsum placerat. elementum dignissim, Vestibulum

              quam efficitur. gravida non. lacus, vehicula, nec id commodo turpis Donec Nam faucibus quis elementum tincidunt tortor. orci adipiscing odio sed sollicitudin. eget quis faucibus diam Cras fringilla Nam Lorem adipiscing vel in Vestibulum


            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}