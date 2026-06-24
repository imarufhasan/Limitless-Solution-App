import EmptyData from '@/components/EmptyData';
import { SkeletonCard } from '@/components/shared/SkeletonBox';
import { useGetProfileQuery } from '@/redux/features/auth/authApi';
import { useGetTaskInfoQuery } from '@/redux/features/home/homeApi';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { BellIcon, Calendar, Car, MapPin, MessageCircle, Phone } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';





const statusConfig: Record<string, { bg: string; text: string }> = {
  Ongoing: { bg: "#652D8B", text: "#FFFFFF" },
  Pending: { bg: "#FEF9C3", text: "#854D0E" },
};

function TaskCard({ item }: { item: any }) {
  const config = statusConfig[item.status];

  return (
    <View className="border  border-[#b6b6ce]" style={{
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      // marginBottom: 12,
      borderWidth: 1,
      borderColor: '#F3F4F6',
    }}>
      {/* Top Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>

        <View style={{ flex: 1 }}>
          <Text className='uppercase' style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18' }}>
            {item.name}
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
            {item.email}
          </Text>
        </View>
        <View style={{
          backgroundColor: config.bg,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 20,
        }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: config.text }}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View style={{ gap: 6, marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <MapPin size={14} color="#9CA3AF" />
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
            {item.address}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Phone size={14} color="#9CA3AF" />
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
            {item.phone}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Calendar size={14} color="#9CA3AF" />
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
            {item.date}
          </Text>
        </View>
      </View>

      {/* Weight & Price */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#6B7280' }}>
          {item.weight}
        </Text>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: '#652D8B' }}>
          {item.price}
        </Text>
      </View>

      {/* Buttons */}
      {
        item?.status !== "Pending" && <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity onPress={() => router.push({
          pathname: "/(trackPickup)/pickupDetails",
          params: { id: item?.id }

        } as any)} style={{
          flex: 1,
          paddingVertical: 12,
          borderRadius: 50,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#652D8B',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
        }}>
          <Car size={16} color="#652D8B" />
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#652D8B' }}>
            Track
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={!item?.conversationId}
          onPress={() => {
            if (!item?.conversationId) return;
            router.push({
              pathname: '/chat/[userId]',
              params: {
                userId: item.conversationId,
                name: item.name
              }
            } as any)
          }} style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 50,
            alignItems: 'center',
            backgroundColor: '#652D8B',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 6,
          }}>
          <MessageCircle size={16} color="white" />
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: 'white' }}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
      }
      
    </View>
  );
}

export default function EmployeeHome() {
  const { data, isLoading } = useGetProfileQuery({});
  const insets = useSafeAreaInsets()
  const { data: getTaskInfo, isLoading: taskLoading, refetch , isFetching} = useGetTaskInfoQuery({})

  const currentAssignment = getTaskInfo?.data?.ongoingAssignment;
  const nextAssignment = getTaskInfo?.data?.pendingAssignment;

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('light');
       
      refetch()
       
        return () => {
        setStatusBarStyle('dark');
      };
    }, []),
  );



  const currentTask = currentAssignment
    ? {
      id: currentAssignment._id,
      name: currentAssignment.customerName,
      email: currentAssignment.customerEmail,
      address: currentAssignment.pickupAddress,
      phone: currentAssignment.customerPhoneNumber,
      conversationId: currentAssignment?.conversationId,
      date: currentAssignment.orderPlacedAt,
      weight: currentAssignment.orderType,
      price: `$${currentAssignment.totalPrice}`,
      status: "Ongoing",
    }
    : null;


  const nextTask = nextAssignment
    ? {
      id: nextAssignment._id,
      name: nextAssignment.customerName,
      email: nextAssignment.customerEmail,
      address: nextAssignment.pickupAddress,
      phone: nextAssignment.customerPhoneNumber,
      date: nextAssignment.orderPlacedAt,
      conversationId: currentAssignment?.conversationId,
      weight: nextAssignment.orderType,
      price: `$${nextAssignment.totalPrice}`,
      status: "Pending",
    }
    : null;

  const stats = [
    { id: "1", value: getTaskInfo?.data?.overview?.accepted || 0, label: "Ongoing" },
    { id: "2", value: getTaskInfo?.data?.overview?.pending || 0, label: "Pending" },
    { id: "3", value: getTaskInfo?.data?.overview?.completed || 0, label: "Completed" },
    { id: "4", value: getTaskInfo?.data?.overview?.cancelled || 0, label: "Cancelled" },
  ];




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['bottom']}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#652D8B', '#8718D2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + 10 }}
          className="px-5 pt-5 pb-10 rounded-b-3xl"
        >
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm text-purple-200">
                Welcome back,
              </Text>
              <Text style={{ fontFamily: "Inter_700Bold" }} className="text-xl text-white ">
                {data?.data?.name}
              </Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <BellIcon size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="flex-row gap-2">
            {stats.map((stat) => (
              <View
                key={stat.id}
                className="flex-1 rounded-xl p-2 items-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <Text style={{ fontFamily: "Inter_700Bold" }} className="text-xl text-white">
                  {stat.value}
                </Text>
                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-[11px] text-purple-200">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>


        {/* Content */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {/* Current Task */}
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 18, color: '#0F0B18', marginBottom: 12 }}>
            Current Task
          </Text>
          {taskLoading  ? <SkeletonCard/> : currentTask ? (
            <TaskCard item={currentTask} />
          ) : (
            <EmptyData label='Current' margin={0} />
          )}

          {/* Next Task */}
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 18, color: '#0F0B18', marginTop: 8 }}>
            Next Task
          </Text>
          {taskLoading  ? <SkeletonCard/> : nextTask ? (
            <TaskCard item={nextTask} />
          ) : (
            <EmptyData label='Next' margin={0} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}