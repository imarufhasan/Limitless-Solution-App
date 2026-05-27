import Carousel from '@/components/ui/Carousel'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { BellIcon } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className='flex-1 bg-[#F8F6FA]'>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mt-3">
          <View className="bg-white rounded-full shadow-lg ">
            <Image source={require('@/assets/images/user.png')} className="w-14 h-14" />
          </View>

          <View className=" mx-auto bg-white px-6 py-2 rounded-full ">
            <Text className="text-[#652D8B] mx-auto">Total Earnings</Text>
            <Text className="text-[18px] mx-auto font-bold ">$1,250.00</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/notifications")}>
          <View className="bg-white rounded-full p-4 shadow-lg">
            <BellIcon size={24} color="#4F4F59" />
          </View>
          </TouchableOpacity>
        </View>

          <Carousel />


      </ScrollView>
    </SafeAreaView>
  )
}

export default Home