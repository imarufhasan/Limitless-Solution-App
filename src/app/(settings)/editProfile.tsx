import BackButton from '@/components/shared/BackButton';
import Button from '@/components/shared/Button';
import { useEditProfileMutation, useGetProfileQuery } from '@/redux/features/auth/authApi';
import { MapPin, Phone, User } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function ProfileSetting() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { data, isLoading } = useGetProfileQuery({});
  const [editProfile, { isLoading: isUpdating }] = useEditProfileMutation();


  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setPhone(data.data.phoneNumber || "");
      setAddress(data.data.address || "");
    }
  }, [data]);


  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('phoneNumber', phone);

      const result = await editProfile(formData).unwrap();
      toast.success(result?.message || "Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} edges={['top']}>
        <ActivityIndicator size="large" color="#652D8B" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top','bottom']}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <BackButton title="Profile Setting" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60, flexGrow: 1, justifyContent: 'center' }}
        >
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
              <Phone size={18} color="#9CA3AF" />
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
          <Button text="Save" handlePress={handleSave} isLoading={isUpdating} />
        </View>
      </View>
    </SafeAreaView>
  );
}