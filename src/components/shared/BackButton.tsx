import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function BackButton({title} : { title : string }) {
  return (
     <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 40,
          paddingBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={30} color="#000000" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-[#0F0B18] text-[24px] mx-auto">
         {title}
        </Text>
      </View>
  )
}