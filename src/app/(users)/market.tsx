import MetalPriceCard from '@/components/shared/MetalPriceCard';
import MetalPriceSkeleton from '@/components/shared/MetalPriceSkeleton';
import { useGetMetalsQuery } from '@/redux/features/metalApi';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Market() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetMetalsQuery({
    page: 1,
    limit: 20,
    ...(search.length > 0 && { searchTerm: search }),
  });

  const metals = data?.data || [];


  return (
    <SafeAreaView className='flex-1 px-4 bg-[#F8F6FA]' edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-2xl mt-2 text-[#0F0B18] mb-4"
        >
          Market Prices
        </Text>

        {/* Search Input */}
        <View className="mb-4">
          <View className="flex-row items-center bg-white border border-gray-200 px-2 py-1 rounded-2xl">
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

        {isLoading ? (
          <MetalPriceSkeleton/>
        ) : metals.length === 0 ? (
          <Text style={{ fontFamily: "Inter_400Regular" }} className="text-center text-gray-400 mt-10">
            No metals found
          </Text>
        ) : (
          <MetalPriceCard metals={metals} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}