import { useGetOrderHistoryQuery } from '@/redux/features/orderApi';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CheckCircle, MapPin, PhoneCall } from 'lucide-react-native';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
    {
        id: "1",
        title: "Request Pending",
        description: "Your request is being reviewed",
        completed: true,
        active: false,
    },
    {
        id: "2",
        title: "Employee Assigned",
        description: "Driver assigned to your request",
        completed: true,
        active: false,
    },
    {
        id: "3",
        title: "On The Way",
        description: "Driver is heading to your location",
        subDescription: "In Progress...",
        completed: true,
        active: true,
    },
    {
        id: "4",
        title: "Completed",
        description: "Pickup completed successfully",
        completed: false,
        active: false,
    },
];

export default function TrackPickup() {

    const { id } = useLocalSearchParams<{ id: string }>()
    const { data, isLoading } = useGetOrderHistoryQuery({ id })

    const pickUpData = data?.data

    const histories = [...(pickUpData?.histories || [])].reverse();


    return (
        <SafeAreaView className="flex-1 bg-[#F8F6FA]" edges={['top', 'bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>


                <View className="flex-row items-center gap-3 pt-2 mb-8 px-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-xl items-center justify-center"
                        style={{ backgroundColor: '#652D8B' }}
                    >
                        <ArrowLeft size={20} color="white" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: "Inter_700Bold" }} className="text-xl">
                            Track Pickup
                        </Text>
                        
                    </View>
                </View>
                {/* Header */}
                <View className="bg-[#652D8B] mx-4 pt-2 py-8  rounded-3xl">


                    {/* MapPin */}
                    <View className="items-center mb-5">
                        <MapPin size={36} color="white" />
                    </View>

                    {/* Address Box inside header */}
                    <View className="bg-white rounded-xl mx-4 px-4 py-3">
                        <Text style={{ fontFamily: "Inter_500Medium" }} className="text-sm text-[#0F0B18]">
                            {pickUpData?.address}
                        </Text>
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
                            {/* <Image
                                source={require('@/assets/images/user.png')}
                                style={{ width: 48, height: 48, borderRadius: 24 }}
                            /> */}
                            <View>
                                <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">
                                    {pickUpData?.employeeName}
                                </Text>
                                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400">
                                    Employee
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row gap-2">
                           
                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${pickUpData?.employeePhoneNumber}`)} className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center">
                                <PhoneCall size={18} color="#652D8B" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Pickup Status */}
                    <View className='bg-white p-4 shadow-xl rounded-xl'>
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-base text-[#0F0B18] mb-5">
                            Pickup Status
                        </Text>

                        {histories?.map((step: any, index: number) => (
                            <View key={step._id} className="flex-row gap-4">
                                {/* Timeline */}
                                <View className="items-center">
                                    <View
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            backgroundColor: "#10B981",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <CheckCircle size={18} color="white" />
                                    </View>

                                    {index < histories.length - 1 && (
                                        <View
                                            style={{
                                                width: 2,
                                                flex: 1,
                                                minHeight: 50,
                                                backgroundColor: "#10B981",
                                                marginTop: 4,
                                            }}
                                        />
                                    )}
                                </View>

                                {/* Content */}
                                <View className="flex-1 pb-5">
                                    <Text
                                        style={{ fontFamily: "Inter_600SemiBold" }}
                                        className="text-sm text-[#0F0B18] mb-1"
                                    >
                                        {step.title}
                                    </Text>

                                    <Text
                                        style={{ fontFamily: "Inter_400Regular" }}
                                        className="text-xs text-gray-500 leading-5"
                                    >
                                        {step.note}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}