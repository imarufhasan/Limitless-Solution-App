import RequestSubmittedModal from '@/components/RequestSubmittedModal';
import BackButton from '@/components/shared/BackButton';
import { useCreateMetalOrderMutation } from '@/redux/features/orderApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { Calendar, FileText, Image as ImageIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function RequestPickup() {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<any[]>([]);

  const { metals: metalsParam } = useLocalSearchParams<{ metals: string }>();
  const selectedMetals = metalsParam ? JSON.parse(metalsParam) : [];

  const [createMetalOrder, { isLoading }] = useCreateMetalOrderMutation();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const pickImage = async () => {
    if (images.length >= 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      toast.error("Permission required to access photos");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'] as ImagePicker.MediaType[],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const remaining = 5 - images.length;
      setImages([...images, ...result.assets.slice(0, remaining)]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      selectedMetals.forEach((item: any, index: number) => {
        formData.append(`items[${index}][metal]`, item._id);
        formData.append(`items[${index}][quantity]`, String(item.quantity));
        formData.append(`items[${index}][price]`, String(item.price));
      });

      formData.append('preferredDate', date.toISOString());
      formData.append('additionalNotes', notes);
      formData.append('deliveryType', 'drop_off');

      images.forEach((img) => {
        formData.append('attachments', {
          uri: img.uri,
          type: img.mimeType || 'image/jpeg',
          name: img.fileName || 'image.jpg',
        } as any);
      });

      const result = await createMetalOrder(formData).unwrap();
      toast.success(result?.message || "Request submitted successfully!");
      setShowSubmitted(true);

    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit request");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F6FA]">
      <View className="flex-1 px-4">
        <BackButton title="Request Pickup" />
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Selected Metals Summary */}
          {selectedMetals.length > 0 && (
            <View className="mb-4">
              <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18] mb-2">
                Selected Metals
              </Text>
              <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E5E7EB' }}>
                {selectedMetals.map((metal: any, i: number) => (
                  <View key={metal._id} style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                    borderBottomWidth: i < selectedMetals.length - 1 ? 1 : 0,
                    borderBottomColor: '#F3F4F6',
                  }}>
                    <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: '#0F0B18' }}>
                      {metal.name} × {metal.quantity} {metal.unit}
                    </Text>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: '#652D8B' }}>
                      ${(metal.price * metal.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}
                {/* Total */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginTop: 4 }}>
                  <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: '#0F0B18' }}>
                    Total
                  </Text>
                  <Text style={{ fontFamily: "Inter_700Bold", fontSize: 14, color: '#652D8B' }}>
                    ${selectedMetals.reduce((sum: number, m: any) => sum + m.price * m.quantity, 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Preferred Date */}
          <View className="mb-4">
            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18] mb-2">
              Preferred Date
            </Text>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <Calendar size={18} color="#9CA3AF" />
              <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm text-[#0F0B18]">
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* Additional Notes */}
          <View className="mb-4">
            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18] mb-2">
              Additional Notes
            </Text>
            <View style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
            }}>
              <FileText size={18} color="#9CA3AF" style={{ marginTop: 2 }} />
              <TextInput
                placeholder="Any additional information..."
                placeholderTextColor="#9CA3AF"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                style={{ fontFamily: "Inter_400Regular", flex: 1 }}
                className="text-sm text-[#0F0B18]"
              />
            </View>
          </View>

          {/* Upload Photo */}
          <View className="mb-4">
            <TouchableOpacity
              onPress={pickImage}
              className="bg-white border border-dashed border-gray-300 rounded-xl p-6 items-center"
            >
              <ImageIcon size={32} color="#9CA3AF" />
              <Text style={{ fontFamily: "Inter_500Medium" }} className="text-sm text-gray-500 mt-2">
                Upload Photos (Optional)
              </Text>
              <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mt-1">
                {images.length}/5 — Click to browse
              </Text>
            </TouchableOpacity>

            {images.length > 0 && (
              <View className="flex-row flex-wrap gap-2 mt-3">
                {images.map((img, i) => (
                  <View key={i} style={{ position: 'relative' }}>
                    <Image
                      source={{ uri: img.uri }}
                      style={{ width: 60, height: 60, borderRadius: 8 }}
                    />
                    <TouchableOpacity
                      onPress={() => setImages(images.filter((_, index) => index !== i))}
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        backgroundColor: '#EF4444',
                        borderRadius: 10,
                        width: 18,
                        height: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 10 }}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Submit Button */}
      <View className="px-4 pb-2 bg-[#F8F6FA]">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          className="bg-[#652D8B] py-4 rounded-full items-center"
        >
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-white text-base">
            {isLoading ? "Submitting..." : "Submit Request"}
          </Text>
        </TouchableOpacity>
      </View>

      <RequestSubmittedModal
        visible={showSubmitted}
        onTrack={() => router.push("/(users)/track" as any)}
        onHome={() => router.push("/(users)/home" as any)}
      />
    </SafeAreaView>
  );
}