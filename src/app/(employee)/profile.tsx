import { router } from 'expo-router';
import { ChevronRight, Globe, HelpCircle, Lock, LogOut, ScrollText, Shield, User } from 'lucide-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const menuItems = [
  { id: "1", title: "Profile Setting", icon: User, onPress: () => router.push("/(settings)/editProfile" as any) },
  { id: "2", title: "Change password", icon: Lock, onPress: () => router.push("/(settings)/changePasswordFromSettings" as any) },
  { id: "3", title: "Support", icon: HelpCircle, onPress: () => router.push("/(settings)/support" as any) },
  { id: "4", title: "About Us", icon: Globe, onPress: () => router.push("/(settings)/about-us" as any) },
  { id: "5", title: "Privacy Policy", icon: Shield, onPress: () => router.push("/(settings)/privacyPolicy" as any) },
  { id: "6", title: "Terms and Conditions", icon: ScrollText, onPress: () => router.push("/(settings)/termsCondition" as any) },
];

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8F6FA]" edges={['top']}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-2xl text-[#0F0B18] text-center mt-2 mb-6"
        >
          Profile
        </Text>

        {/* Avatar */}
        <View className="items-center mb-8">
          <View style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#F0EAF3',
          }}>
            <Image
              source={require('@/assets/images/user2.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-lg text-[#0F0B18] mt-3"
          >
            Jhon Deo
          </Text>
        </View>

        {/* Menu Items */}
        <View style={{
          overflow: 'hidden',
          marginBottom: 35,
        }}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
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
                <ChevronRight size={25} color="#0F0B18" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderWidth: 1,
            borderColor: '#652D8B',
            borderRadius: 20,
            paddingVertical: 14,
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
      </ScrollView>
    </SafeAreaView>
  );
}