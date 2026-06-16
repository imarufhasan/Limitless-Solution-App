import { useGetAllbannerQuery } from "@/redux/features/home/homeApi";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import BannerItem from "../BannerItem/BannerItem";

const { width } = Dimensions.get("window");

export default function Carousel() {
    const { data, isLoading } = useGetAllbannerQuery({});

    const slides =
        data?.data?.map((item: any) => ({
            id: item?._id,
            image: item?.url,
        })) || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const GAP = 12;

    // ✅ FIXED AUTO SLIDER (NO MEMORY LEAK)
    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = (prev + 1) % slides.length;

                flatListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });

                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    if (isLoading) {
        return (
            <View
                style={{
                    height: 150,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
        );
    }

    if (!slides.length) return null;

    return (
        <View style={{ marginVertical: 10 }}>
            <View style={{ borderRadius: 20, overflow: "hidden" }}>
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    snapToOffsets={slides.map(
                        (_: any, i: number) => i * (width - 32 + GAP)
                    )}
                    getItemLayout={(_, index) => ({
                        length: width - 32 + GAP,
                        offset: (width - 32 + GAP) * index,
                        index,
                    })}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(
                            e.nativeEvent.contentOffset.x /
                            (width - 32 + GAP)
                        );
                        setCurrentIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <BannerItem image={item?.image} />
                    )}
                />
            </View>

            {/* DOTS */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 6,
                    marginTop: 10,
                }}
            >
                {slides.map((item: any, i: number) => (
                    <View
                        key={item.id}
                        style={{
                            height: 8,
                            width: i === currentIndex ? 20 : 8,
                            borderRadius: 4,
                            backgroundColor:
                                i === currentIndex
                                    ? "#652D8B"
                                    : "#D1D5DB",
                        }}
                    />
                ))}
            </View>
        </View>
    );
}