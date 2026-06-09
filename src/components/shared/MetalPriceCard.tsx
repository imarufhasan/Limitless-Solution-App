import React from 'react';
import { FlatList, Text, View } from 'react-native';

type Metal = {
  _id: string;
  name: string;
  unit: string;
  price: number;
  priceTrending: number;
  priceTrendingDirection: 'up' | 'down';
};

export default function MetalPriceCard( { metals } : { metals : Metal[] }) {
    return (
        <FlatList
            data={metals}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}  
            renderItem={({ item }) => (
                <View className="flex-row justify-between shadow-lg shadow-gray-400 items-center bg-white mb-2 rounded-xl px-2 py-3 border border-gray-200">
                    <View>
                        <Text
                            style={{ fontFamily: "Inter_600SemiBold" }}
                            className="text-sm text-[#0F0B18]"
                        >
                            {item.name}
                        </Text>
                        <Text
                            style={{ fontFamily: "Inter_400Regular" }}
                            className="text-xs text-gray-400"
                        >
                            {item.unit}
                        </Text>
                    </View>
                    <Text
                        style={{ fontFamily: "Inter_600SemiBold" }}
                        className="text-base text-[#0F0B18]"
                    >
                        {item.price}
                    </Text>
                </View>
            )}
        />
    )
}