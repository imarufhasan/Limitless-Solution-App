import { useGetProfileQuery } from '@/redux/features/auth/authApi';
import { useGetConversationMessagesQuery } from '@/redux/features/socketApis/socketApi';
import { getSocket, initSocket } from '@/socket/socket';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, Send } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AppState,
  FlatList,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  image?: string | null;
};

export default function ChatScreen() {
  const { userId, name } = useLocalSearchParams<{ userId: string; name: string }>();
  const conversationId = userId;
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<any>(null);
  const typingTimeoutRef = useRef<any>(null);
  const isJoinedRef = useRef(false);

  const [input, setInput] = useState('');
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline'>('offline');

  const { data: profileData, refetch: profileRefetch } = useGetProfileQuery({});
  const myId = profileData?.data?._id;
  const myIdRef = useRef(myId);

  const { data: messagesData, refetch } = useGetConversationMessagesQuery(
    conversationId,
    { skip: !conversationId }
  );

  const token = useSelector((state: any) => state.auth.token);

  // myId ref sync
  useEffect(() => {
    myIdRef.current = myId;
  }, [myId]);

  // Socket init
  useEffect(() => {
    if (token) initSocket(token);
  }, [token]);

  // Typing timeout cleanup
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // App foreground/background handle
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        const socket = getSocket();
        if (!socket?.connected && token) {
          initSocket(token);
        }
        if (conversationId) {
          getSocket()?.emit('join', { conversationId });
        }
      }
    });
    return () => subscription.remove();
  }, [token, conversationId]);

  useFocusEffect(
    useCallback(() => {
      refetch()
      profileRefetch();
    }, [])
  );

  const restMessages: Message[] = useMemo(() => {
    if (!myId || !messagesData?.data?.messages) return [];

    return messagesData.data.messages
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
  }, [messagesData, myId]);

  const allMessages = [
    ...restMessages,
    ...socketMessages.filter((sm) => !restMessages.some((rm) => rm.id === sm.id)),
  ];

  // Socket listeners
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !conversationId) return;

    const joinConversation = () => {
      if (!isJoinedRef.current) {
        socket.emit('join', { conversationId });
        isJoinedRef.current = true;
      }
    };

    if (socket.connected) {
      joinConversation();
    } else {
      socket.once('connect', joinConversation);
    }

    const handleReconnect = () => {
      isJoinedRef.current = false;
      joinConversation();
    };

    const handleNewMessage = (res: any) => {
      const message = res?.data ?? res;
      if (!message) return;
      if (message.conversation !== conversationId) return;

      const currentMyId = myIdRef.current;

      const newMsg: Message = {
        id: message._id || Date.now().toString(),
        text: message.text,
        time: new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isMine: message.sender === currentMyId || message.senderId === currentMyId,
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

    socket.on('connect', handleReconnect);
    socket.on('new_message', handleNewMessage);
    socket.on('display_typing', handleTyping);
    socket.on('participant_status', handleStatus);

    return () => {
      socket.emit('leave_conversation', { conversationId });
      isJoinedRef.current = false;
      socket.off('connect', handleReconnect);
      socket.off('connect', joinConversation);
      socket.off('new_message', handleNewMessage);
      socket.off('display_typing', handleTyping);
      socket.off('participant_status', handleStatus);
    };
  }, [conversationId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const socket = getSocket();
    if (!socket) return;

    if (!socket.connected) {
      if (token) initSocket(token);
      socket.once('connect', () => {
        socket.emit('send_message', {
          conversationId,
          message: input.trim(),
        });
      });
      setInput('');
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

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit('display_typing', { conversationId, isTyping: false });
    }, 800);
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#652D8B' }} edges={['top']}>
      <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>

        {/* Header */}
        <View
          style={{
            backgroundColor: '#652D8B',
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontFamily: 'Inter_600SemiBold', color: 'white', fontSize: 16 }}>
              {name || 'Unknown User'}
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 11, color: '#e9d5ff' }}>
              {onlineStatus === 'online' ? '🟢 Online' : '⚪ Offline'}
            </Text>
          </View>
        </View>

        {/* ✅ KeyboardAvoidingView platform অনুযায়ী */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {/* Message List */}
          <FlatList
            ref={flatListRef}
            data={allMessages}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"       // ✅ drag করলে keyboard নামবে
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              gap: 8,
              flexGrow: 1,                        // ✅ messages কম হলেও bottom এ থাকবে
            }}
            ListHeaderComponent={
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                  color: '#9CA3AF',
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                Today
              </Text>
            }
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: item.isMine ? 'flex-end' : 'flex-start',
                }}
              >
                <View
                  style={{
                    maxWidth: '75%',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 18,
                    ...(item.isMine
                      ? {
                        backgroundColor: '#652D8B',
                        borderTopRightRadius: 4,
                      }
                      : {
                        backgroundColor: 'white',
                        borderTopLeftRadius: 4,
                        borderWidth: 1,
                        borderColor: '#F3F4F6',
                      }),
                  }}
                >
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 4 }}
                      resizeMode="cover"
                    />
                  )}
                  {item.text ? (
                    <Text
                      style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        color: item.isMine ? 'white' : '#0F0B18',
                      }}
                    >
                      {item.text}
                    </Text>
                  ) : null}
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 11,
                      marginTop: 4,
                      color: item.isMine ? '#e9d5ff' : '#9CA3AF',
                      textAlign: 'right',
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            )}
          />

          {/* Typing indicator */}
          {isTyping && (
            <View style={{ paddingHorizontal: 16, paddingBottom: 4 }}>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: '#9CA3AF' }}>
                typing...
              </Text>
            </View>
          )}

          {/* ✅ Input bar — insets.bottom দিয়ে safe area handle */}
          <View
            style={{
              paddingBottom: insets.bottom + 10,
              paddingTop: 10,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderTopWidth: 1,
              borderTopColor: '#F3F4F6',
              backgroundColor: 'white',
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#F3F4F6',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ImageIcon size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                backgroundColor: '#F3F4F6',
                borderRadius: 24,
                paddingHorizontal: 16,
                paddingVertical: 2,
              }}
            >
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
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#652D8B',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}