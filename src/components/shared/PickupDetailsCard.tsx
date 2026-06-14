import { router } from 'expo-router';
import { ArrowLeft, Package, User } from 'lucide-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    buttonLabel: string;
    buttonIcon: any;
    onPress: () => void;
    status?: string;
    showDecline?: boolean;
    onDecline?: () => void;
    assignment: any
};

export default function PickupDetailsCard({ buttonLabel, buttonIcon: ButtonIcon, onPress, status = "Ongoing", showDecline = false, onDecline , assignment }: Props) {
    console.log("assignment screen", assignment)
    return (
        <SafeAreaView className="flex-1 bg-[#F8F6FA] " edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 55 }}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between py-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-12 h-12 rounded-xl bg-[#652D8B] items-center justify-center"
                    >
                        <ArrowLeft size={25} color="white" />
                    </TouchableOpacity>

                    <View>
                        <Text style={{ fontFamily: "Inter_700Bold" }} className="text-xl text-[#0F0B18]">
                            Pickup Details
                        </Text>
                        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400">
                            Request #1235
                        </Text>
                    </View>

                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text style={{ fontFamily: "Inter_500Medium" }} className="text-xs text-[#1447E6]">
                            {status}
                        </Text>
                    </View>
                </View>

                {/* Customer Information */}
                <View className="bg-white rounded-2xl p-4 mb-3 border border-gray-300">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center gap-2">
                            <User size={22} color="#652D8B" />
                            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">
                                Customer Information
                            </Text>
                        </View>
                        {/* <TouchableOpacity onPress={()=> router.push("/chat/[userId]")} className="w-9 h-9 rounded-full  border border-[#652D8B] items-center justify-center">
                            <MessageSquareMore size={20} color="#652D8B" />
                        </TouchableOpacity> */}
                    </View>

                    {[
                        { label: "Name", value: "Aaron" },
                        { label: "Address", value: "123 Main Street, Dhaka" },
                        { label: "Contact Number", value: "+91 98765 43210" },
                        { label: "Date", value: "2026-04-04" },
                    ].map((field) => (
                        <View key={field.label} className="mb-3">
                            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mb-0.5">
                                {field.label}
                            </Text>
                            <Text style={{ fontFamily: "Inter_500Medium" }} className="text-sm text-[#0F0B18]">
                                {field.value}
                            </Text>
                        </View>
                    ))}

                    <View>
                        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mb-2">
                            Special Instructions
                        </Text>
                        <View className="bg-yellow-50 rounded-lg p-3">
                            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-yellow-800">
                                Please call 10 minutes before arrival.{'\n'}Gate code: #1234
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Scrap Details */}
                <View className="bg-white rounded-2xl p-4 border border-gray-300 mb-4">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Package size={18} color="#652D8B" />
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">
                            Scrap Details
                        </Text>
                    </View>

                    <View className="flex-row gap-6 mb-3">
                        <View>
                            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mb-0.5">Type</Text>
                            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">Iron & Copper</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mb-0.5">Est. Weight</Text>
                            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">50 kg</Text>
                        </View>
                    </View>

                    <View className="mb-4">
                        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mb-0.5">Est. Value</Text>
                        <Text style={{ fontFamily: "Inter_700Bold" }} className="text-xl text-[#652D8B]">$2,500</Text>
                    </View>

                    <View className="rounded-xl overflow-hidden">
                        <Image
                            source={require('@/assets/images/car.png')}
                            style={{ width: '100%', height: 160 }}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Button */}


                <>
                    {showDecline ? (
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity
                                onPress={onDecline}
                                style={{
                                    flex: 1,
                                    paddingVertical: 12,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: '#E5E7EB',
                                }}
                            >
                                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#374151' }}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onPress}
                                style={{
                                    flex: 1,
                                    paddingVertical: 12,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    backgroundColor: '#652D8B',
                                }}
                            >
                                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: 'white' }}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={onPress}
                            className="bg-[#652D8B] py-3  rounded-xl flex-row items-center justify-center gap-2 mb-4"
                        >
                            <ButtonIcon size={16} color="white" />
                            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-white text-sm">
                                {buttonLabel}
                            </Text>
                        </TouchableOpacity>
                    )}
                </>



            </ScrollView >
        </SafeAreaView >
    );
}