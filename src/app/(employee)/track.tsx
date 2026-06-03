import { router } from 'expo-router';
import { Calendar, MapPin, MessageCircle, Phone, Truck } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = ["Pending", "Ongoing", "Completed"];

const requests = [
  {
    id: "1",
    name: "Nahid",
    email: "nahid@gmail.com",
    address: "123 Main Street, Dhaka",
    phone: "+91 98765 43212",
    date: "2026-04-04",
    weight: "75 kg",
    price: "$3,200",
    status: "Pending",
    image: require("@/assets/images/user.png"),
  },
  {
    id: "2",
    name: "Robert",
    email: "robert@gmail.com",
    address: "123 Main Street, Dhaka",
    phone: "+91 98765 43212",
    date: "2026-04-04",
    weight: "Car",
    price: "$30,000",
    status: "Pending",
    image: require("@/assets/images/user.png"),
  },
  {
    id: "3",
    name: "Aaron",
    email: "aaron@gmail.com",
    address: "123 Main Street, Dhaka",
    phone: "+91 98765 43212",
    date: "2026-04-04",
    weight: "75 kg",
    price: "$3,200",
    status: "Ongoing",
    image: require("@/assets/images/user.png"),
  },
  {
    id: "4",
    name: "Aaron",
    email: "aaron@gmail.com",
    address: "123 Main Street, Dhaka",
    phone: "+91 98765 43212",
    date: "2026-04-04",
    weight: "75 kg",
    price: "$3,200",
    status: "Completed",
    image: require("@/assets/images/user.png"),
  },
];

const statusConfig: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "#FEF9C3", text: "#854D0E" },
  Ongoing: { bg: "#652D8B", text: "#FFFFFF" },
  Completed: { bg: "#F0FDF4", text: "#166534" },
};

export default function EmployeeTrack() {
  const [activeTab, setActiveTab] = useState("Pending");

  const filtered = requests.filter((r) => r.status === activeTab);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>

        {/* Header */}
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 28, color: '#0F0B18', marginTop: 8, marginBottom: 16 }}>
          Track Pickups
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
            <View style={{ alignItems: 'center', marginTop: 80 }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#9CA3AF' }}>
                No {activeTab} tasks
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const config = statusConfig[item.status];
            return (
              <TouchableOpacity
                activeOpacity={item.status === "Pending" ? 0.7 : 1}
                onPress={() => {
                  if (item.status === "Pending") {
                    router.push("/(trackPickup)/pendingPickup" as any);
                  }
                }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#F3F4F6',
                }}
              >
                {/* Top Row */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <Image
                    source={item.image}
                    style={{ width: 44, height: 44, borderRadius: 22, marginRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18' }}>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: item.status === "Ongoing" ? 12 : 0 }}>
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#6B7280' }}>
                    {item.weight}
                  </Text>
                  <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: '#652D8B' }}>
                    {item.price}
                  </Text>
                </View>

                {/* Ongoing Buttons */}
                {item.status === "Ongoing" && (
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                      onPress={() => router.push("/(trackPickup)/pendingPickup" as any)}
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        borderRadius: 50,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 6,
                      }}>
                      <Truck size={16} color="#374151" />
                      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#374151' }}>
                        Track
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => router.push(`/chat/${item.id}` as any)}
                      style={{
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
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}