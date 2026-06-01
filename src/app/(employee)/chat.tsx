import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const conversations = [
  {
    id: "1",
    name: "Admin Maria",
    role: "Admin",
    message: "What's update?",
    time: "10 min ago",
    unread: 2,
    image: require("@/assets/images/user.png"),
  },
  {
    id: "2",
    name: "Aaron",
    role: "Customer",
    message: "I will be home by 2 PM. Please come then.",
    time: "10 min ago",
    unread: 2,
    image: require("@/assets/images/user.png"),
  },
  {
    id: "3",
    name: "Nahid",
    role: "Customer",
    message: "Where are you?",
    time: "1 hour ago",
    unread: 0,
    image: require("@/assets/images/user.png"),
  },
];

export default function Chat() {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      {/* Header */}
      <View style={{
        backgroundColor: '#652D8B',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 30,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 28, color: 'white', marginBottom: 16 }}>
          Messages
        </Text>

        {/* Search */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
          gap: 10,
        }}>
          <Search size={18} color="rgba(255,255,255,0.7)" />
          <TextInput
            placeholder="Search customers..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={search}
            onChangeText={setSearch}
            style={{
              fontFamily: "Inter_400Regular",
              flex: 1,
              fontSize: 14,
              color: 'white',
            }}
          />
        </View>
      </View>

      {/* List */} 
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#9CA3AF' }}>
              No conversations found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/chat/${item.id}` as any)}
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 14,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#F3F4F6',
            }}
          >
            {/* Avatar */}
            <Image
              source={item.image}
              style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
            />

            {/* Content */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18' }}>
                {item.name}
              </Text>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#9CA3AF', marginBottom: 2 }}>
                {item.role}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#6B7280' }}
              >
                {item.message}
              </Text>
            </View>

            {/* Right */}
            <View style={{ alignItems: 'flex-end', gap: 6 }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: '#9CA3AF' }}>
                {item.time}
              </Text>
              {item.unread > 0 && (
                <View style={{
                  backgroundColor: '#652D8B',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 11, color: 'white' }}>
                    {item.unread}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}