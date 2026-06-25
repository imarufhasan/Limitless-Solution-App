import EmptyData from '@/components/EmptyData';
import { SkeletonCard } from '@/components/shared/SkeletonBox';
import { useGetAssignmentsQuery } from '@/redux/features/employee/assignmentApi';
import { router, useLocalSearchParams } from 'expo-router';
import { Calendar, MapPin, MessageCircle, Phone, Truck } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = ["pending", "accepted", "completed"];

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "#FEF9C3", text: "#854D0E", label: "Pending" },
  accepted: { bg: "#652D8B", text: "#FFFFFF", label: "Accepted" },
  completed: { bg: "#F0FDF4", text: "#166534", label: "Completed" },
};

export default function EmployeeTrack() {
  const { tab } = useLocalSearchParams<{ tab: string }>();
  const [activeTab, setActiveTab] = useState(tabs.includes(tab) ? tab : "pending");


  useEffect(() => {
    if (tab && tabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [tab]);

  const { data, isLoading, isFetching } = useGetAssignmentsQuery({
    page: 1,
    limit: 10,
    sortOrder: 'desc',
    status: activeTab,
  }, {
    refetchOnMountOrArgChange: true,
  });

  const assignments = data?.data || [];






  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>

        {/* Header */}
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 28, color: '#0F0B18', marginTop: 8, marginBottom: 16 }}>
          Track Pickup
        </Text>

        {/* Tabs */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#F0EAF3',
          borderRadius: 4,
          marginBottom: 16,
        }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 4,
                alignItems: 'center',
                backgroundColor: activeTab === tab ? "#652D8B" : "transparent",
              }}
            >
              <Text style={{
                fontFamily: activeTab === tab ? "Inter_600SemiBold" : "Inter_400Regular",
                fontSize: 14,
                color: activeTab === tab ? "#FFFFFF" : "#6B7280",
              }}>
                {statusConfig[tab].label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Loading */}
        {isLoading || isFetching ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>

        ) : (
          <FlatList
            data={assignments}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <EmptyData label={statusConfig[activeTab].label} margin={80} />
            }
            renderItem={({ item }) => {
              const config = statusConfig[item.status] || statusConfig['pending'];
              return (
                <TouchableOpacity
                  activeOpacity={item.status === "pending" ? 0.7 : 1}
                  onPress={() => {
                    if (item.status === "pending") {
                      router.push({
                        pathname: "/(trackPickup)/pendingPickup",
                        params: { id: item?.assignmentId },
                      } as any);
                    }
                  }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: '#F1F1F2',
                  }}
                >
                  {/* Top Row */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View style={{
                      width: 44, height: 44, borderRadius: 22,
                      backgroundColor: '#F3E8FF', alignItems: 'center',
                      justifyContent: 'center', marginRight: 10,
                    }}>
                      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: '#652D8B' }}>
                        {item.customerName?.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18' }}>
                        {item.customerName}
                      </Text>
                      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
                        {item.customerEmail}
                      </Text>
                    </View>
                    <View style={{
                      backgroundColor: config.bg,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 20,
                    }}>
                      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: config.text }}>
                        {config.label}
                      </Text>
                    </View>
                  </View>

                  {/* Details */}
                  <View style={{ gap: 6, marginBottom: 12 }}>
                    {item.pickupAddress && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <MapPin size={14} color="#9CA3AF" />
                        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
                          {item.pickupAddress}
                        </Text>
                      </View>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Phone size={14} color="#9CA3AF" />
                      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
                        {item.customerPhoneNumber}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Calendar size={14} color="#9CA3AF" />
                      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#6B7280' }}>
                        {new Date(item.orderPlacedAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric"
                        })}
                      </Text>
                    </View>
                  </View>

                  {/* Price */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: item.status === "accepted" ? 12 : 0 }}>
                    <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#6B7280' }}>
                      {item.orderType}
                    </Text>
                    <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: '#652D8B' }}>
                      ${item.totalPrice}
                    </Text>

                  </View>


                  {/* View Details Button */}
                  {
                    item.status === "pending" && <TouchableOpacity
                    onPress={()=>router.push({
                      pathname: "/(trackPickup)/pendingPickup",
                      params: { id: item?.assignmentId },
                    } as any)}
                      style={{
                        flex: 1, paddingVertical: 12, borderRadius: 50, marginTop: 10,
                        alignItems: 'center', borderWidth: 1, borderColor: '#652D8B',
                        flexDirection: 'row', justifyContent: 'center', gap: 6,
                      }}>
                      <Truck size={16} color="#652D8B" />
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#652D8B' }}>
                        View Details
                      </Text>
                    </TouchableOpacity>
                  }



                  {/* Accepted Buttons */}
                  {item.status === "accepted" && (
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (item?.orderStatus === 'on_the_way') {
                            router.push({
                              pathname: "/(trackPickup)/pickupReceived",
                              params: { id: item?.assignmentId },
                            } as any);
                          } else if (item?.orderStatus === 'received') {
                            router.push({
                              pathname: "/(trackPickup)/pickupCompleted",
                              params: { id: item?.assignmentId },
                            } as any);
                          } else {
                            router.push({
                              pathname: "/(trackPickup)/pickupDetails",
                              params: { id: item?.assignmentId },
                            } as any)
                          }
                        }}
                        style={{
                          flex: 1, paddingVertical: 12, borderRadius: 50,
                          alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB',
                          flexDirection: 'row', justifyContent: 'center', gap: 6,
                        }}>
                        <Truck size={16} color="#374151" />
                        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#374151' }}>
                          Track
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={!item?.conversationId}
                        onPress={() => {
                          if (!item?.conversationId) return;
                          router.push({
                            pathname: '/chat/[userId]',
                            params: { userId: item.conversationId, name: item?.customerName }
                          } as any)
                        }}
                        style={{
                          flex: 1, paddingVertical: 12, borderRadius: 50,
                          alignItems: 'center',
                          backgroundColor: item?.conversationId ? '#652D8B' : '#C4C4C4',
                          flexDirection: 'row', justifyContent: 'center', gap: 6,
                          opacity: item?.conversationId ? 1 : 0.6,
                        }}
                      >
                        <MessageCircle size={16} color="white" />
                        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: 'white' }}>
                          Chat
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}