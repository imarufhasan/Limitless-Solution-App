import { SkeletonCard } from '@/components/shared/SkeletonBox';
import { useAcceptQuoteMutation, useCancelQuoteMutation, useGetVehicleOrdersQuery } from '@/redux/features/orderApi';
import { router } from 'expo-router';
import { Calendar, Clock, FileText, MapPin, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

const tabs = ["pending", "qouted", "accepted", "completed"];

const statusConfig: Record<string, { bg: string; text: string; border: string; label: string }> = {
  pending: { bg: "#FEF9C3", text: "#854D0E", border: "#FEF9C3", label: "Pending" },
  qouted: { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE", label: "Quoted" },
  accepted: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0", label: "Accepted" },
  completed: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0", label: "Completed" },
};

export default function Track() {
  const [activeTab, setActiveTab] = useState("pending");


  const { data, isLoading , isFetching} = useGetVehicleOrdersQuery({ page: 1, limit: 20, status: activeTab, }, { refetchOnMountOrArgChange: true, });

  const orders = data?.data || [];

  const [acceptQuote, { isLoading: isAccepting }] = useAcceptQuoteMutation();
  const [cancelQuote, { isLoading: isCancelling }] = useCancelQuoteMutation();

  const handleAcceptQuote = async (orderId: string) => {
    try {
      const result = await acceptQuote(orderId).unwrap();
      toast.success(result?.message || "Quote accepted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept quote");
    }
  };
  const handleCancelQuote = async (orderId: string) => {
    try {
      const result = await cancelQuote(orderId).unwrap();
      toast.success(result?.message || "Quote cancelled successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel quote");
    }
  }




  return (
    <SafeAreaView className="flex-1 bg-[#F8F6FA]" edges={['top']}>
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="mt-2 mb-4">
          <Text style={{ fontFamily: "Inter_700Bold" }} className="text-3xl text-[#0F0B18]">
            Request History
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm text-[#4F4F59] mt-1">
            Track all your Car & Metal sell requests
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-[#F0EAF3] rounded-sm mb-4">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 2,
                alignItems: 'center',
                backgroundColor: activeTab === tab ? "#652D8B" : "transparent",
              }}
            >
              <Text style={{
                fontFamily: activeTab === tab ? "Inter_600SemiBold" : "Inter_400Regular",
                fontSize: 13,
                color: activeTab === tab ? "#FFFFFF" : "#6B7280",
                textTransform: 'capitalize',
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
            data={orders}
            keyExtractor={(item) => item.orderId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View className="items-center mt-20">
                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-gray-400 text-sm">
                  No {activeTab} requests
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const config = statusConfig[item.status] ?? statusConfig['pending'];
              return (
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#F3F4F6',
                }}>
                  {/* Top Row */}
                  <View className="flex-row justify-between gap-1 items-center mb-2">
                    <Text style={{ fontFamily: "Inter_700Bold" }} className=" text-[#0F0B18]">
                      {item.orderNumber}
                    </Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: config.bg,
                      borderWidth: 1,
                      borderColor: config.border,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 20,
                      gap: 4,
                    }}>
                      {item.status === "pending" && <Clock size={12} color={config.text} />}
                      {item.status === "quoted" && <FileText size={12} color={config.text} />}
                      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: config.text }}>
                        {config.label}
                      </Text>
                    </View>
                  </View>

                  {/* Date */}
                  <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mb-3">
                    Submitted on {new Date(item.orderRequestedAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric"
                    })}
                  </Text>

                  {/* Notes */}
                  {item.additionalNotes && (
                    <View className="bg-[#F0EAF3] rounded-lg px-3 py-2 mb-3">
                      <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-500">
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-xs text-[#0F0B18]">Notes: </Text>
                        {item.additionalNotes}
                      </Text>
                    </View>
                  )}

                  {/* Car Value */}
                  {item.subTotal > 0 && (
                    <View style={{
                      backgroundColor: '#F0FDF4',
                      borderWidth: 1,
                      borderColor: '#BBF7D0',
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 12,
                    }}>
                      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#166534' }}>
                        Total Value
                      </Text>
                      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: '#166534' }}>
                        ${item?.subTotal || 0}
                      </Text>
                    </View>
                  )}

                  {/* Pickup Address */}
                  {item.pickupAddress && (
                    <View style={{
                      backgroundColor: '#EFF6FF',
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 12,
                    }}>
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: '#1E40AF', marginBottom: 8 }}>
                        Pickup Details
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <MapPin size={14} color="#3B82F6" />
                        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#3B82F6' }}>
                          {item.pickupAddress}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <Calendar size={14} color="#3B82F6" />
                        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#3B82F6' }}>
                          {new Date(item.preferredDate).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric"
                          })}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <User size={14} color="#3B82F6" />
                        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#3B82F6' }}>
                          {item.customerName}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Buttons */}
                  {item.status === "qouted" && (
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <TouchableOpacity
                        onPress={() => handleCancelQuote(item.orderId)}
                        disabled={isCancelling}
                        style={{
                          flex: 1, paddingVertical: 12, borderRadius: 30,
                          alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB',
                        }}>
                        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#374151' }}>
                          {isCancelling ? "Cancelling..." : "Cancel Quote"}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleAcceptQuote(item.orderId)}
                        disabled={isAccepting}
                        style={{
                          flex: 1, paddingVertical: 12, borderRadius: 30,
                          alignItems: 'center', backgroundColor: '#652D8B',
                        }}>
                        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: 'white' }}>
                          {isAccepting ? "Accepting..." : "Accept Quote"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {(item.status === "accepted" ||
                    item?.status === "on_the_way" || item?.status !== "qouted" || item?.status === "completed" || item?.status === "assigned" || item?.status === "received"
                  ) && item?.deliveryType === "pickup" && (
                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TouchableOpacity
                          onPress={() => router.push({
                            pathname: "/trackPick",
                            params: { id: item?.orderId }
                          } as any)}
                          style={{
                            flex: 1, paddingVertical: 12, borderRadius: 30,
                            alignItems: 'center', borderWidth: 1, borderColor: '#652D8B',
                          }}>
                          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#652D8B' }}>
                            Track
                          </Text>
                        </TouchableOpacity>
                        {
                          item?.conversationId  && <TouchableOpacity
                          onPress={() => {
                            router.push({
                              pathname: '/chat/[userId]',
                              params: { userId: item.conversationId, name : item?.employeeName}
                            } as any)
                          }}
                          style={{
                            flex: 1, paddingVertical: 12, borderRadius: 30,
                            alignItems: 'center', backgroundColor: '#652D8B',
                          }}>
                          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: 'white' }}>
                            Chat
                          </Text>
                        </TouchableOpacity>
                        }
                        
                      </View>
                    )}
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}