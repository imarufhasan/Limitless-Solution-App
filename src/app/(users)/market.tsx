import MetalPriceCard from '@/components/shared/MetalPriceCard';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Market() {
  const [search, setSearch] = useState("");

  const metals = [
    { id: "1", name: "Iron", unit: "Per lbs", price: "$150" },
    { id: "2", name: "Copper", unit: "Per lbs", price: "$850" },
    { id: "3", name: "Aluminum", unit: "Per  lbs", price: "$220" },
    { id: "4", name: "Steel", unit: "Per lbs", price: "$180" },
    { id: "5", name: "Steel", unit: "Per lbs", price: "$150" },
    { id: "6", name: "Steel", unit: "Per lbs", price: "$120" },
    { id: "7", name: "Steel", unit: "Per lbs", price: "$180" },
  ];

  const filteredMetals = metals.filter((metal) =>
    metal.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className='flex-1 px-4  bg-[#F8F6FA]' edges={['top']}>
      <ScrollView
        className="flex-1 "
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-2xl  mt-2 text-[#0F0B18] mb-4 "
        >
          Market Prices
        </Text>

        {/* Search Input */}
        <View className=" mb-4 ">
          <View className="flex-row items-center bg-white border border-gray-200 px-2 py-1 rounded-2xl ">
            <Search size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search metals..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
              style={{ fontFamily: "Inter_400Regular", flex: 1 }}
              className="text-sm text-[#0F0B18]"
            />
          </View>
        </View>
        <View className="">
          <MetalPriceCard metals={filteredMetals} />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}