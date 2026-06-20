import { useGetProfileQuery } from '@/redux/features/auth/authApi';
import { useGetConversationMessagesQuery } from '@/redux/features/socketApis/socketApi';
import { getSocket, initSocket } from '@/socket/socket';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, Send } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  image?: string | null;
};

export default function ChatScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const conversationId = userId; // userId param = conversationId value
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<any>(null);

  const [input, setInput] = useState('');
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline'>('offline');

  const { data: profileData } = useGetProfileQuery({});
  const myId = profileData?.data?._id;

  const { data: messagesData, refetch } = useGetConversationMessagesQuery(
    conversationId,
    { skip: !conversationId }
  );

  const token = useSelector((state: any) => state.auth.token); 


  useEffect(() => {
  if (token) {
    initSocket(token); 
  }
}, [token]);

  useFocusEffect(
    useCallback(() => {
      refetch().catch((err) => console.log('Refetch Error:', err));
    }, [])
  );

  const restMessages: Message[] = (messagesData?.data?.messages || [])
    .map((msg: any) => ({
      id: msg._id,
      text: msg.text,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMine: msg.senderId === myId,
      image: msg.attachments?.[0] || null,
    }))
    .reverse();

  const allMessages = [
    ...restMessages,
    ...socketMessages.filter((sm) => !restMessages.some((rm) => rm.id === sm.id)),
  ];

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !conversationId) return;

    socket.emit('join', { conversationId });

    const handleNewMessage = (res: any) => {
      const message = res?.data ?? res;
      if (!message) return;
      if (message.conversation !== conversationId) return;

      const newMsg: Message = {
        id: message._id || Date.now().toString(),
        text: message.text,
        time: new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isMine: message.sender === myId || message.senderId === myId,
        image: message.attachments?.[0] || null,
      };

      setSocketMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });

      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    const handleTyping = (data: any) => {
      if (data.conversationId === conversationId) setIsTyping(data.isTyping);
    };

    const handleStatus = (data: any) => {
      if (data.conversationId === conversationId) setOnlineStatus(data.status);
    };

    socket.on('new_message', handleNewMessage);
    socket.on('display_typing', handleTyping);
    socket.on('participant_status', handleStatus);

    return () => {
      socket.emit('leave_conversation', { conversationId });
      socket.off('new_message', handleNewMessage);
      socket.off('display_typing', handleTyping);
      socket.off('participant_status', handleStatus);
    };
  }, [conversationId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const socket = getSocket();

    console.log('socket:', socket);
    console.log('conversationId:', conversationId);
    console.log('input:', input);

    if (!socket) {
      console.log('NO SOCKET!');
      return;
    }

    socket.emit('send_message', {
      conversationId,
      message: input.trim(),
    });

    setInput('');
  };
  const handleTypingChange = (text: string) => {
    setInput(text);
    const socket = getSocket();
    socket?.emit('display_typing', { conversationId, isTyping: true });
    setTimeout(() => {
      socket?.emit('display_typing', { conversationId, isTyping: false });
    }, 800);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}>
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
          <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-white text-base">
            Aaron
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-purple-200 text-xs">
            Customer
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <FlatList
          ref={flatListRef}
          data={allMessages}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 8 }}
          ListHeaderComponent={
            <Text
              style={{ fontFamily: 'Inter_400Regular' }}
              className="text-xs text-gray-400 text-center mb-2"
            >
              Today
            </Text>
          }
          renderItem={({ item }) => (
            <View className={`flex-row ${item.isMine ? 'justify-end' : 'justify-start'}`}>
              <View
                style={{ maxWidth: '75%' }}
                className={`px-4 py-3 rounded-2xl ${item.isMine
                    ? 'bg-[#652D8B] rounded-tr-sm'
                    : 'bg-white border border-gray-100 rounded-tl-sm'
                  }`}
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 200, height: 200 }}
                    resizeMode="cover"
                  />
                )}
                {item.text ? (
                  <Text
                    style={{ fontFamily: 'Inter_400Regular' }}
                    className={`text-sm ${item.isMine ? 'text-white' : 'text-[#0F0B18]'}`}
                  >
                    {item.text}
                  </Text>
                ) : null}
                <Text
                  style={{ fontFamily: 'Inter_400Regular' }}
                  className={`text-xs mt-1 ${item.isMine ? 'text-purple-200' : 'text-gray-400'}`}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Input */}
        <View
          style={{ paddingBottom: insets.bottom || 12 }}
          className="px-4 pt-3 flex-row items-center gap-3 border-t border-gray-100 bg-white"
        >
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <ImageIcon size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="flex-1 bg-gray-100 rounded-full px-4 py-1">
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={input}
              onChangeText={handleTypingChange}
              multiline
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: '#0F0B18',
                minHeight: 40,
                maxHeight: 100,
              }}
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
    </View>
  );
}