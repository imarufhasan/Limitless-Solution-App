import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// A simple animated shimmer block
function SkeletonBox({
    width,
    height,
    borderRadius = 8,
    style = {},
}: {
    width: number | string;
    height: number;
    borderRadius?: number;
    style?: object;
}) {
    return (
        <View
            style={[
                {
                    width: width as any,
                    height,
                    borderRadius,
                    backgroundColor: '#E5E7EB',
                },
                style,
            ]}
        />
    );
}

export default function TrackPickupSkeleton() {
    return (
        <SafeAreaView className="flex-1 bg-[#F8F6FA]" edges={['top', 'bottom']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {/* Header Row — back button + title */}
                <View className="flex-row items-center gap-3 pt-2 mb-8 px-4">
                    <SkeletonBox width={40} height={40} borderRadius={12} />
                    <SkeletonBox width={120} height={22} borderRadius={6} />
                </View>

                {/* Purple card */}
                <View
                    className="mx-4 pt-2 py-8 rounded-3xl items-center"
                    style={{ backgroundColor: '#E5E7EB' }}
                >
                    {/* MapPin placeholder */}
                    <SkeletonBox
                        width={36}
                        height={36}
                        borderRadius={18}
                        style={{ marginBottom: 20, backgroundColor: '#D1D5DB' }}
                    />

                    {/* Address box */}
                    <View
                        style={{
                            backgroundColor: '#F3F4F6',
                            borderRadius: 12,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            width: '88%',
                            gap: 8,
                        }}
                    >
                        <SkeletonBox width="100%" height={14} borderRadius={4} />
                        <SkeletonBox width="70%" height={14} borderRadius={4} />
                    </View>
                </View>

                {/* Content */}
                <View className="px-4 mt-4">
                    {/* Employee Card */}
                    <View
                        className="bg-white rounded-2xl p-4 flex-row items-center justify-between border border-gray-100 mb-6"
                        style={{ elevation: 2 }}
                    >
                        <View className="flex-row items-center gap-3">
                            {/* Avatar */}
                            <SkeletonBox width={40} height={40} borderRadius={20} />
                            <View style={{ gap: 6 }}>
                                <SkeletonBox width={120} height={14} borderRadius={4} />
                                <SkeletonBox width={60} height={11} borderRadius={4} />
                            </View>
                        </View>
                        {/* Phone button */}
                        <SkeletonBox width={40} height={40} borderRadius={20} />
                    </View>

                    {/* Pickup Status Card */}
                    <View className="bg-white p-4 shadow-xl rounded-xl">
                        {/* Section title */}
                        <SkeletonBox
                            width={120}
                            height={16}
                            borderRadius={4}
                            style={{ marginBottom: 20 }}
                        />

                        {/* 3 skeleton timeline steps */}
                        {[0, 1, 2].map((index) => (
                            <View key={index} className="flex-row gap-4">
                                {/* Circle + line */}
                                <View className="items-center">
                                    <SkeletonBox
                                        width={32}
                                        height={32}
                                        borderRadius={16}
                                        style={{ backgroundColor: '#D1D5DB' }}
                                    />
                                    {index < 2 && (
                                        <View
                                            style={{
                                                width: 2,
                                                flex: 1,
                                                minHeight: 50,
                                                backgroundColor: '#E5E7EB',
                                                marginTop: 4,
                                            }}
                                        />
                                    )}
                                </View>

                                {/* Text lines */}
                                <View className="flex-1 pb-5" style={{ gap: 6 }}>
                                    <SkeletonBox width={100} height={14} borderRadius={4} />
                                    <SkeletonBox width="85%" height={11} borderRadius={4} />
                                    <SkeletonBox width="60%" height={11} borderRadius={4} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}