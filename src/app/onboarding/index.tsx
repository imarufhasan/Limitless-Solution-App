import { router } from "expo-router";
import { Calculator, TrendingUp, Truck } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList as RNFlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  IconComponent: React.ComponentType<any>;
};

const slides: Slide[] = [
  {
    id: "1",
    title: "Live Market Prices",
    description:
      "Get real-time scrap metal prices updated instantly. Know the exact value of your materials.",
    icon: "📈",
    IconComponent: TrendingUp,
  },
  {
    id: "2",
    title: "Instant Valuation",
    description:
      "Calculate your vehicle or scrap value in seconds. Get accurate estimates instantly.",
    icon: "🧮",
    IconComponent: Calculator,
  },
  {
    id: "3",
    title: "Easy Pickup",
    description:
      "Schedule a pickup at your convenience. Track your request in real-time.",
    icon: "🚚",
    IconComponent: Truck,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<RNFlatList<Slide>>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      router.replace("/(auth)/register" as any);
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/register" as any);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Slides */}
      <RNFlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ width }}
            className="flex-1 items-center justify-center px-10"
          >
            {/* Icon */}
            <View className="w-28 h-28 rounded-3xl bg-[#9810FA] items-center justify-center mb-10">
              <item.IconComponent size={56} color="white" strokeWidth={2} />
            </View>

            {/* Title */}
            <Text
              style={{ fontFamily: "Inter_700Bold" }}
              className="text-3xl text-center text-[#0F0B18] mb-4"
            >
              {item.title}
            </Text>

            {/* Description */}
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-base text-center px-3 text-[#4F4F59] leading-6"
            >
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex-row justify-center items-center gap-2 mb-8">
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              height: 8,
              width: i === currentIndex ? 24 : 8,
              borderRadius: 4,
              backgroundColor: i === currentIndex ? "#652D8B" : "#d1d5db",
            }}
          />
        ))}
      </View>

      {/* Buttons */}
      <View className="px-8 pb-12 gap-4">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-[#652D8B] py-4 rounded-full items-center mb-2"
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-white text-base "
          >
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>

        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={handleSkip} className="items-center py-2">
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-gray-500 text-base"
            >
              Skip
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}