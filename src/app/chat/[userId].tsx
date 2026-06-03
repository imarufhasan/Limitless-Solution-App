import { router } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, Send } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
};

const initialMessages: Message[] = [
  { id: "1", text: "Hello! I'm on my way to your location.", time: "10:30 AM", isMine: false },
  { id: "2", text: "Great! What's the ETA?", time: "10:31 AM", isMine: true },
  { id: "3", text: "I should reach in about 15 minutes.", time: "10:32 AM", isMine: false },
  { id: "4", text: "Is the vehicle ready for pickup?", time: "10:32 AM", isMine: false },
  { id: "5", text: "Yes, everything is ready. The car is parked outside.", time: "10:33 AM", isMine: true },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const flatListRef = useRef<any>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View className="bg-[#652D8B] px-4 py-3 flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={require('@/assets/images/user.png')}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View>
            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-white text-base">
              Aaron
            </Text>
            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-purple-200 text-xs">
              Customer
            </Text>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 8 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListHeaderComponent={
            <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 text-center mb-2">
              Today
            </Text>
          }
          renderItem={({ item }) => (
            <View className={`flex-row ${item.isMine ? 'justify-end' : 'justify-start'}`}>
              <View
                style={{ maxWidth: '75%' }}
                className={`px-4 py-3 rounded-2xl ${
                  item.isMine
                    ? 'bg-[#652D8B] rounded-tr-sm'
                    : 'bg-white border border-gray-100 rounded-tl-sm'
                }`}
              >
                <Text
                  style={{ fontFamily: "Inter_400Regular" }}
                  className={`text-sm ${item.isMine ? 'text-white' : 'text-[#0F0B18]'}`}
                >
                  {item.text}
                </Text>
                <Text
                  style={{ fontFamily: "Inter_400Regular" }}
                  className={`text-xs mt-1 ${item.isMine ? 'text-purple-200' : 'text-gray-400'}`}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Input */}
        <View className="px-4 py-3 flex-row items-center gap-3 border-t border-gray-100 bg-white">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <ImageIcon size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="flex-1 bg-gray-100 rounded-full px-4 py-3">
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={input}
              onChangeText={setInput}
              style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#0F0B18' }}
            />
          </View>

          <TouchableOpacity
            onPress={sendMessage}
            className="w-10 h-10 rounded-full bg-[#652D8B] items-center justify-center"
          >
            <Send size={18} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}