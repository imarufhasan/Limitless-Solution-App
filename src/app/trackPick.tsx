import { router } from 'expo-router';
import { ArrowLeft, CheckCircle, MapPin, MessageSquareMore, PhoneCall } from 'lucide-react-native';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
    return (
        <SafeAreaView className="flex-1 bg-[#F8F6FA]" edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>


                {/* Back + Title */}
                <View className="flex-row items-center gap-3 mb-8 px-4">
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
                        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-[#4F4F59]">
                            Request #1235
                        </Text>
                    </View>
                </View>
                {/* Header */}
                <View className="bg-[#652D8B] mx-4 pt-4 py-8 rounded-3xl">


                    {/* MapPin */}
                    <View className="items-center mb-5">
                        <MapPin size={36} color="white" />
                    </View>

                    {/* Address Box inside header */}
                    <View className="bg-white rounded-xl mx-4 px-4 py-3">
                        <Text style={{ fontFamily: "Inter_500Medium" }} className="text-sm text-[#0F0B18]">
                            123 Main Street, Dhaka
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
                            <Image
                                source={require('@/assets/images/user.png')}
                                style={{ width: 48, height: 48, borderRadius: 24 }}
                            />
                            <View>
                                <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">
                                    Michael
                                </Text>
                                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400">
                                    Employee
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row gap-2">
                            <TouchableOpacity onPress={() => router.push('/chat/[userId]')} className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center">
                                <MessageSquareMore size={18} color="#652D8B" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('tel:+919876543212')} className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center">
                                <PhoneCall size={18} color="#652D8B" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Pickup Status */}
                    <View className='bg-white p-4 shadow-xl rounded-xl'>
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-base text-[#0F0B18] mb-5">
                            Pickup Status
                        </Text>

                        {steps.map((step, i) => (
                            <View key={step.id} className="flex-row gap-4">
                                {/* Dot & Line */}
                                <View className="items-center">
                                    <View style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 16,
                                        backgroundColor: step.completed ? '#10B981' : '#F3F4F6',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: step.completed ? 0 : 2,
                                        borderColor: '#E5E7EB',
                                    }}>
                                        {step.completed ? (
                                            <CheckCircle size={18} color="white" />
                                        ) : (
                                            <View style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: '#D1D5DB',
                                            }} />
                                        )}
                                    </View>

                                    {i < steps.length - 1 && (
                                        <View style={{ alignItems: 'center', flex: 1, minHeight: 50, marginVertical: 2 }}>
                                            {Array.from({ length: 7 }).map((_, j) => (
                                                <View key={j} style={{
                                                    width: 2,
                                                    height: 6,
                                                    backgroundColor: steps[i + 1].completed ? '#10B981' : '#E5E7EB',
                                                    marginBottom: 3,
                                                    borderRadius: 1,
                                                }} />
                                            ))}
                                        </View>
                                    )}
                                </View>

                                {/* Content */}
                                <View className="flex-1 pb-5">
                                    <Text
                                        style={{ fontFamily: "Inter_600SemiBold" }}
                                        className={`text-sm mb-1 ${step.completed ? 'text-[#0F0B18]' : 'text-gray-400'}`}
                                    >
                                        {step.title}
                                    </Text>
                                    <Text
                                        style={{ fontFamily: "Inter_400Regular" }}
                                        className="text-xs text-gray-400 leading-5"
                                    >
                                        {step.description}
                                    </Text>
                                    {step.subDescription && (
                                        <Text
                                            style={{ fontFamily: "Inter_600SemiBold" }}
                                            className="text-xs text-[#652D8B] mt-0.5"
                                        >
                                            {step.subDescription}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}