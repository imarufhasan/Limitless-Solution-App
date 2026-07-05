import LogoutModal from '@/components/shared/LogoutModal';
import { logout } from '@/redux/features/auth/authSlice';
import { useCreateSupportConversationMutation } from '@/redux/features/socketApis/socketApi';
import { useAppDispatch } from '@/redux/hooks';
import { persistor } from '@/redux/store';
import { disconnectSocket } from '@/socket/socket';
import { router } from 'expo-router';
import { ChevronRight, Globe, HelpCircle, Lock, LogOut, ScrollText, Shield, User } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Profile() {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const [createSupportConversation, { isLoading }] = useCreateSupportConversationMutation({})

  const handleSupport = async () => {
    try {
      const res = await createSupportConversation({}).unwrap();
      router.push({
        pathname: "/(settings)/support",
        params: {
          conversationId: res.data._id,
        },
      });
    } catch (error) {
    }
  };

  const menuItems = [
    { id: "1", title: "Profile Setting", icon: User, onPress: () => router.push("/(settings)/editProfile" as any) },
    { id: "2", title: "Change password", icon: Lock, onPress: () => router.push("/(settings)/changePasswordFromSettings" as any) },
    { id: "3", title: "Support", icon: HelpCircle, onPress: () => handleSupport() },
    { id: "4", title: "About Us", icon: Globe, onPress: () => router.push("/(settings)/about-us" as any) },
    { id: "5", title: "Privacy Policy", icon: Shield, onPress: () => router.push("/(settings)/privacyPolicy" as any) },
    { id: "6", title: "Terms and Conditions", icon: ScrollText, onPress: () => router.push("/(settings)/termsCondition" as any) },
  ];

  const handleLogout = async () => {
    await persistor.purge();
    dispatch(logout());
    disconnectSocket();
    router.replace("/(auth)/login" as any);
  }
  return (
    <SafeAreaView className="flex-1 bg-[#F8F6FA]" edges={['top']}>
      <ScrollView
        className="flex-1  px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,

        }}
      >
        {/* Header */}
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-2xl text-[#0F0B18] text-center mt-2 mb-6"
        >
          Profile
        </Text>



        {/* Menu Items */}
        <View style={{
          overflow: 'hidden',
          marginBottom: 35,
          width: '100%',
        }}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                disabled={item.id === "3" && isLoading}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                }}
                className="bg-white mb-2 rounded-xl border border-[#F1F1F2]"
              >
                <Icon size={20} color="#0F0B18" style={{ marginRight: 12 }} />
                <Text
                  style={{ fontFamily: "Inter_500Medium", flex: 1 }}
                  className="text-md text-[#0F0B18]"
                >
                  {item.title}
                </Text>
                {item.id === "3" && isLoading ? (
                  <ActivityIndicator size="small" color="#652D8B" />
                ) : (
                  <ChevronRight size={25} color="#0F0B18" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={() => setLogoutModalVisible(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderWidth: 1,
            borderColor: '#652D8B',
            borderRadius: 20,
            paddingVertical: 14,
            width: '100%',
          }}
        >
          <LogOut size={18} color="#652D8B" />
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-[#652D8B] text-md"
          >
            Logout
          </Text>
        </TouchableOpacity>
        <LogoutModal
          visible={logoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          onConfirm={() => {
            setLogoutModalVisible(false);
            handleLogout();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}