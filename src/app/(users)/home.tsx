import MetalPriceCard from '@/components/shared/MetalPriceCard'
import Carousel from '@/components/ui/Carousel'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { ArrowRight, BellIcon, Calculator, Car, Zap } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const quickActions = [
    {
      id: "1",
      title: "Sell My Car",
      description: "Sell your scrap car easily",
      icon: Car,
      onPress: () => router.push("/sell-car" as any),
    },
    {
      id: "2",
      title: "Estimate Value",
      description: "Instant scrap value estimate",
      icon: Calculator,
      onPress: () => router.push("/(users)/calculator" as any),
    },
  ];

  const metals = [
    { id: "1", name: "Iron", unit: "Per lbs", price: "$150" },
    { id: "2", name: "Copper", unit: "Per lbs", price: "$850" },
    { id: "3", name: "Aluminum", unit: "Per lbs", price: "$220" },
    { id: "4", name: "Steel", unit: "Per lbs", price: "$180" },
    { id: "5", name: "Steel", unit: "Per lbs", price: "$180" },
  ];



  return (
    <SafeAreaView className='flex-1 bg-[#F8F6FA]' edges={['top']}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mt-3">
          <View className="bg-white rounded-full overflow-hidden shadow-lg ">
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
        {/* Title */}
        <View>
          <View className="flex-row items-center mb-3">
            <Zap size={18} color="#652D8B" fill="#652D8B" />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base text-[#0F0B18] ml-2"
            >
              Quick Actions
            </Text>
          </View>

          {/* Action Cards */}
          <View className="flex-row gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  onPress={action.onPress}
                  className="flex-1 flex-row bg-gray-50 rounded-2xl gap-2 py-2 border border-gray-200 "
                >
                  <View className="w-10  h-10 rounded-full bg-purple-100 items-center justify-center">
                    <Icon color="#652D8B" />
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: "Inter_600SemiBold" }}
                      className="text-xs text-[#0F0B18] mb-1"
                    >
                      {action.title}
                    </Text>
                    <Text
                      style={{ fontFamily: "Inter_400Regular" }}
                      className="text-[10px] text-gray-500"
                    >
                      {action.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Live Metal Prices */}
        <View className="pt-6 px-[1px]">
          {/* Title */}
          <View className="flex-row justify-between items-center mb-3">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base text-[#0F0B18]"
            >
              Live Metal Prices
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/market" as any)}
              className="flex-row items-center"
            >
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-sm text-[#652D8B] mr-1"
              >
                View All
              </Text>
              <ArrowRight size={16} color="#652D8B" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Metal Price Cards */}
        <MetalPriceCard metals={metals} />



      </ScrollView>
    </SafeAreaView >
  )
}

export default Home