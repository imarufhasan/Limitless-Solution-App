import { router } from 'expo-router';
import { BellIcon, Calendar, Car, MapPin, MessageCircle, Phone } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stats = [
  { id: "1", value: "1", label: "Ongoing" },
  { id: "2", value: "5", label: "Pending" },
  { id: "3", value: "15", label: "Completed" },
];

const currentTasks = [
  {
    id: "1",
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
];

const nextTasks = [
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
];

const statusConfig: Record<string, { bg: string; text: string }> = {
  Ongoing: { bg: "#652D8B", text: "#FFFFFF" },
  Pending: { bg: "#FEF9C3", text: "#854D0E" },
};

function TaskCard({ item }: { item: typeof currentTasks[0] }) {
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#6B7280' }}>
          {item.weight}
        </Text>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: '#652D8B' }}>
          {item.price}
        </Text>
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity onPress={() => router.push("/(trackPickup)/pickupDetails" as any)} style={{
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
          <Car size={16} color="#374151" />
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#374151' }}>
            Track
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
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
    </View>
  );
}

export default function EmployeeHome() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{
          backgroundColor: '#652D8B',
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#E9D5FF' }}>
                Welcome back,
              </Text>
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 22, color: 'white' }}>
                John Deo
              </Text>
            </View>
            <TouchableOpacity style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <BellIcon size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {stats.map((stat) => (
              <View key={stat.id} style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 12,
                padding: 12,
                alignItems: 'center',
              }}>
                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: 'white' }}>
                  {stat.value}
                </Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#E9D5FF' }}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {/* Current Task */}
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: '#0F0B18', marginBottom: 12 }}>
            Current Task
          </Text>
          {currentTasks.map((item) => (
            <TaskCard key={item.id} item={item} />
          ))}

          {/* Next Task */}
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: '#0F0B18', marginBottom: 12, marginTop: 8 }}>
            Next Task
          </Text>
          {nextTasks.map((item) => (
            <TaskCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}