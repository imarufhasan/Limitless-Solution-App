import { router } from 'expo-router';
import { Calendar, Clock, FileText, MapPin, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = ["Pending", "Quoted", "Accepted", "Completed"];

const requests = [
  {
    id: "1",
    requestId: "4323269",
    date: "May 14, 2026",
    notes: "Car has minor damage on front bumper",
    status: "Pending",
  },
  {
    id: "2",
    requestId: "4323269",
    date: "May 14, 2026",
    notes: "Car has minor damage on front bumper",
    status: "Quoted",
    carValue: "$850",
  },
  {
    id: "3",
    requestId: "4323269",
    date: "May 14, 2026",
    notes: "Car has minor damage on front bumper",
    status: "Accepted",
    carValue: "$850",
  },
  {
    id: "4",
    requestId: "4323269",
    date: "May 14, 2026",
    notes: "Car has minor damage on front bumper",
    status: "Completed",
    carValue: "$850",
    pickup: {
      address: "123 Main Street, Dhaka",
      date: "5/5/2026 at 10:00 AM",
      employee: "Michael",
    },
  },
];

const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
  Pending: { bg: "#FEF9C3", text: "#854D0E", border: "#FEF9C3" },
  Quoted: { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
  Accepted: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  Completed: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
};

export default function Track() {
  const [activeTab, setActiveTab] = useState("Pending");

  const filtered = requests.filter((r) => r.status === activeTab);

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
        <View className="flex-row bg-[#F0EAF3] rounded-sm  mb-4 ">
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
              <Text
                style={{
                  fontFamily: activeTab === tab ? "Inter_600SemiBold" : "Inter_400Regular",
                  fontSize: 14,
                  color: activeTab === tab ? "#FFFFFF" : "#6B7280",
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
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
            const config = statusConfig[item.status];
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
                <View className="flex-row justify-between items-center mb-2">
                  <Text style={{ fontFamily: "Inter_700Bold" }} className="text-base text-[#0F0B18]">
                    {item.requestId}
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
                    {item.status === "Pending" && <Clock size={12} color={config.text} />}
                    {item.status === "Quoted" && <FileText size={12} color={config.text} />}
                    <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: config.text }}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                {/* Date */}
                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mb-3">
                  Submitted on {item.date}
                </Text>

                {/* Notes */}
                <View className="bg-[#F0EAF3] rounded-lg px-3 py-2 mb-3">
                  <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-500">
                    <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-xs text-[#0F0B18]">Notes: </Text>
                    {item.notes}
                  </Text>
                </View>

                {/* Car Value — Quoted, Accepted, Completed */}
                {item.carValue && (
                  <View style={{
                    backgroundColor: '#F0FDF4',
                    borderWidth: 1,
                    borderColor: '#BBF7D0',
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12,
                  }}>
                    <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#166534' }}>
                      Car Value
                    </Text>
                    <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: '#166534' }}>
                      {item.carValue}
                    </Text>
                  </View>
                )}

                {/* Pickup Details — Completed */}
                {item.pickup && (
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
                        {item.pickup.address}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <Calendar size={14} color="#3B82F6" />
                      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#3B82F6' }}>
                        {item.pickup.date}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <User size={14} color="#3B82F6" />
                      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#3B82F6' }}>
                        Employee: {item.pickup.employee}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Buttons */}
                {item.status === "Quoted" && (
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 30,
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                    }}>
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#374151' }}>
                        Decline
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 30,
                      alignItems: 'center',
                      backgroundColor: '#652D8B',
                    }}>
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: 'white' }}>
                        Accept Quote
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {item.status === "Accepted" && (
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity onPress={()=> router.push("/trackPick" as any)} style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 30,
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#652D8B',
                    }}>
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#652D8B' }}>
                        Track
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 30,
                      alignItems: 'center',
                      backgroundColor: '#652D8B',
                    }}>
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: 'white' }}>
                        Chat
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}