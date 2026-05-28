import BackButton from '@/components/shared/BackButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Calendar, Car, FileText, Image as ImageIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SellYourCar() {
    const [date, setDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [vin, setVin] = useState("");
    const [notes, setNotes] = useState("");
    const [delivery, setDelivery] = useState("dropoff");
    const [images, setImages] = useState<string[]>([]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Permission required to access photos");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ['images'] as ImagePicker.MediaType[],
            allowsMultipleSelection: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            const uris = result.assets.map((a) => a.uri);
            setImages([...images, ...uris]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F8F6FA]">
            <View className="flex-1 px-4">
                <BackButton title="Sell Your Car" />
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {/* Hero */}
                    <View className="items-center py-4">
                        <View className="w-16 h-16 rounded-full bg-purple-100 items-center justify-center mb-3">
                            <Car size={32} color="#652D8B" />
                        </View>
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-xl text-[#0F0B18] mb-1">
                            Sell Your Car
                        </Text>
                        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm text-gray-500 text-center">
                            Enter your vehicle details to receive a quote
                        </Text>
                    </View>

                    {/* VIN Number */}
                    <View className="mb-4">
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18] mb-2">
                            VIN Number
                        </Text>
                        <TextInput
                            placeholder="1HGBH41JXMN109188"
                            placeholderTextColor="#9CA3AF"
                            value={vin}
                            onChangeText={setVin}
                            style={{ fontFamily: "Inter_400Regular" }}
                            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0F0B18]"
                        />
                        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-400 mt-1">
                            Enter the 17-character Vehicle Identification Number
                        </Text>
                    </View>

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
                                placeholder="Any additional information about the vehicle condition, damages, etc."
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

                    {/* Delivery Method */}
                    <View className="mb-4">
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18] mb-2">
                            Delivery Method
                        </Text>
                        <TouchableOpacity
                            onPress={() => setDelivery("dropoff")}
                            className={`flex-row items-center p-4 rounded-xl mb-2 border ${delivery === "dropoff" ? "border-purple-400 bg-purple-50" : "border-gray-200 bg-white"
                                }`}
                        >
                            <View className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${delivery === "dropoff" ? "border-purple-600" : "border-gray-300"
                                }`}>
                                {delivery === "dropoff" && <View className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                            </View>
                            <View className="flex-1">
                                <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">Drop-off</Text>
                                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-500">Bring your car to our location</Text>
                                <Text style={{ fontFamily: "Inter_500Medium" }} className="text-xs text-green-500 mt-0.5">Higher price</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setDelivery("pickup")}
                            className={`flex-row items-center p-4 rounded-xl border ${delivery === "pickup" ? "border-purple-400 bg-purple-50" : "border-gray-200 bg-white"
                                }`}
                        >
                            <View className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${delivery === "pickup" ? "border-purple-600" : "border-gray-300"
                                }`}>
                                {delivery === "pickup" && <View className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                            </View>
                            <View className="flex-1">
                                <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#0F0B18]">Pickup</Text>
                                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-gray-500">We'll pick up from your location</Text>
                                <Text style={{ fontFamily: "Inter_500Medium" }} className="text-xs text-orange-400 mt-0.5">Convenient service</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Upload Photo */}
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
                                Click to browse
                            </Text>
                        </TouchableOpacity>

                        {/* Selected Images */}
                        {images.length > 0 && (
                            <View className="flex-row flex-wrap gap-2 mt-3">
                                {images.map((uri, i) => (
                                    <View key={i} style={{ position: 'relative' }}>
                                        <Image
                                            source={{ uri }}
                                            style={{ width: 80, height: 80, borderRadius: 8 }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setImages(images.filter((_, index) => index !== i))}
                                            style={{
                                                position: 'absolute',
                                                top: -6,
                                                right: -6,
                                                backgroundColor: '#EF4444',
                                                borderRadius: 10,
                                                width: 20,
                                                height: 20,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 12 }}>✕</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* What happens next */}
                    <View className="bg-[#EFF6FF] border border-[#BEDBFF] rounded-xl p-4 mb-4">
                        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm text-[#1C398E] mb-3">
                            What happens next?
                        </Text>
                        {[
                            "Our team will review your VIN and vehicle details",
                            "You'll receive a quote within 24 hours",
                            "Accept the quote and schedule pickup or drop-off",
                        ].map((item, i) => (
                            <View key={i} className="flex-row items-center gap-2 mb-2">
                                <View className="w-1.5 h-1.5 rounded-full bg-[#155DFC]" />
                                <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs text-[#193CB8] flex-1">
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Submit Button */}
            <View className="px-4 pb-2 bg-[#F8F6FA]">
                <TouchableOpacity className="bg-[#652D8B] py-4 rounded-full items-center">
                    <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-white text-base">
                        Submit Request
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}