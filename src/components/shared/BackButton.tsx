import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  title: string,
  textColor?: string,
   showBorder?: boolean
}

export default function BackButton({ title, textColor, showBorder=false }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 16  ,  borderBottomWidth: showBorder ? 1 : 0, borderBottomColor: "#E5E5E5" }}>
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft size={30} color="#000000" />
      </TouchableOpacity>
      <Text style={{ fontFamily: "Inter_600SemiBold", color: textColor || "#0F0B18" }} className="text-[24px] mx-auto">
        {title}
      </Text>
    </View>
  )
}