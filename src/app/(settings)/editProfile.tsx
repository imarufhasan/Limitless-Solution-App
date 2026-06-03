import BackButton from '@/components/shared/BackButton';
import * as ImagePicker from 'expo-image-picker';
import { Camera, MapPin, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileSetting() {
  const [name, setName] = useState("John Deo");
  const [phone, setPhone] = useState("02-8312024");
  const [address, setAddress] = useState("123 Main Street, Dhaka");
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'] as ImagePicker.MediaType[],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <BackButton title="Profile Setting" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {/* Avatar */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <View style={{ position: 'relative' }}>
              <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                overflow: 'hidden',
                backgroundColor: '#F3E8FF',
              }}>
                <Image
                  source={avatar ? { uri: avatar } : require('@/assets/images/user.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#652D8B',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              >
                <Camera size={14} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Name */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#0F0B18', marginBottom: 8 }}>
              Name
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3E8FF20',
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 14,
              gap: 10,
              borderWidth: 1,
              borderColor: '#F3F4F6',
            }}>
              <User size={18} color="#9CA3AF" />
              <TextInput
                value={name}
                onChangeText={setName}
                style={{ fontFamily: "Inter_400Regular", flex: 1, fontSize: 14, color: '#0F0B18' }}
              />
            </View>
          </View>

          {/* Mobile Number */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#0F0B18', marginBottom: 8 }}>
              Mobile Number
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3E8FF20',
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 14,
              gap: 10,
              borderWidth: 1,
              borderColor: '#F3F4F6',
            }}>
              <Text style={{ fontSize: 18 }}>🇺🇸</Text>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280' }}>∨</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={{ fontFamily: "Inter_400Regular", flex: 1, fontSize: 14, color: '#0F0B18' }}
              />
            </View>
          </View>

          {/* Address */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#0F0B18', marginBottom: 8 }}>
              Address
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3E8FF20',
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 14,
              gap: 10,
              borderWidth: 1,
              borderColor: '#F3F4F6',
            }}>
              <MapPin size={18} color="#9CA3AF" />
              <TextInput
                value={address}
                onChangeText={setAddress}
                style={{ fontFamily: "Inter_400Regular", flex: 1, fontSize: 14, color: '#0F0B18' }}
              />
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={{ paddingBottom: 16 }}>
          <TouchableOpacity style={{
            backgroundColor: '#652D8B',
            paddingVertical: 16,
            borderRadius: 50,
            alignItems: 'center',
            marginBottom: 40,
          }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: 'white' }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}