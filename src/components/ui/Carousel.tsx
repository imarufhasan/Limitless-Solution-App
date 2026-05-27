import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
    {
        id: "1",
        image: require("@/assets/images/banner1.png"),
    },
    {
        id: "2",
        image: require("@/assets/images/banner2.png"),
    },
    {
        id: "3",
        image: require("@/assets/images/banner3.png"),
    },
    {
        id: "4",
        image: require("@/assets/images/banner1.png"),
    },
    {
        id: "5",
        image: require("@/assets/images/banner2.png"),
    },
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<any>(null);


    const GAP = 12;



    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
            setCurrentIndex(nextIndex);
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <View style={{ marginVertical: 10, marginHorizontal: 0 }}>
            <View style={{
                borderRadius: 20,
                overflow: "hidden",
                marginHorizontal: 0,
            }}>
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    horizontal
                    pagingEnabled={false}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    snapToOffsets={slides.map((_, i) => i * (width - 32 + GAP))}
                    getItemLayout={(_, index) => ({
                        length: width - 32 + GAP,
                        offset: (width - 32 + GAP) * index,
                        index,
                    })}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(
                            e.nativeEvent.contentOffset.x / (width - 32 + GAP)
                        );
                        setCurrentIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <View style={{
                            width: width - 32,
                            height: 150,
                            marginRight: GAP,
                        }}>
                            <Image
                                source={item.image}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "stretch",
                                }}
                            />
                        </View>
                    )}
                />
            </View>

            {/* Dots */}
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
                marginTop: 10,
            }}>
                {slides.map((item, i) => (
                    <View
                        key={item.id}
                        style={{
                            height: 8,
                            width: i === currentIndex ? 20 : 8,
                            borderRadius: 4,
                            backgroundColor: i === currentIndex ? "#652D8B" : "#D1D5DB",
                        }}
                    />
                ))}
            </View>
        </View>
    );
}