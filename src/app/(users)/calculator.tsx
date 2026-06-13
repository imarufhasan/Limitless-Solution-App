import CalculatorResultModal from '@/components/CalculatorResultModal';
import { useGetMetalsQuery } from '@/redux/features/metalApi';
import { router } from 'expo-router';
import { Calculator as CalculatorIcon, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SelectedMetal = {
  _id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
};

export default function Calculator() {
  const [showResult, setShowResult] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMetals, setSelectedMetals] = useState<SelectedMetal[]>([]);

  const { data: metalsData } = useGetMetalsQuery({ page: 1, limit: 20 });
  const metals = metalsData?.data || [];

  const addMetal = (metal: any) => {
    const exists = selectedMetals.find((m) => m._id === metal._id);
    if (!exists) {
      setSelectedMetals([...selectedMetals, {
        _id: metal._id,
        name: metal.name,
        price: metal.price,
        unit: metal.unit,
        quantity: 1,
      }]);
    }
    setShowDropdown(false);
  };

  const removeMetal = (id: string) => {
    setSelectedMetals(selectedMetals.filter((m) => m._id !== id));
  };

  const updateQuantity = (id: string, qty: string) => {
    const quantity = parseInt(qty) || 1;
    setSelectedMetals(selectedMetals.map((m) => m._id === id ? { ...m, quantity } : m));
  };

  const getSubtotal = (metal: SelectedMetal) => {
    return (metal.price * metal.quantity).toFixed(2);
  };

  const getTotal = () => {
    return selectedMetals.reduce((sum, m) => sum + m.price * m.quantity, 0).toFixed(2);
  };

  const handleEstimate = () => {
    if (selectedMetals.length === 0) return;
    setShowResult(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top']}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

          {/* Title */}
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 24, color: '#0F0B18', marginTop: 8 }}>
            Value Calculator
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280', marginBottom: 20 }}>
            Estimate your scrap value
          </Text>

          {/* Dropdown */}
          <TouchableOpacity
            onPress={() => setShowDropdown(true)}
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              marginBottom: 20,
            }}
          >
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#9CA3AF' }}>
              Select a metal to add
            </Text>
            <ChevronDown size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Selected Metals */}
          {selectedMetals.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18', marginBottom: 12 }}>
                Selected Metals
              </Text>
              {selectedMetals.map((metal) => (
                <View key={metal._id} style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}>
                  {/* Name & Remove */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18' }}>
                      {metal.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeMetal(metal._id)}>
                      <Text style={{ color: '#EF4444', fontSize: 18 }}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Unit Price */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#9CA3AF' }}>
                      Unit Price
                    </Text>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: '#0F0B18' }}>
                      ${metal.price}/{metal.unit}
                    </Text>
                  </View>

                  {/* Quantity */}
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#9CA3AF', marginBottom: 6 }}>
                    Quantity ({metal.unit})
                  </Text>
                  <TextInput
                    value={metal.quantity.toString()}
                    onChangeText={(val) => updateQuantity(metal._id, val)}
                    keyboardType="numeric"
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: '#0F0B18',
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      marginBottom: 10,
                    }}
                  />

                  {/* Subtotal */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#9CA3AF' }}>
                      Subtotal
                    </Text>
                    <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: '#652D8B' }}>
                      ${getSubtotal(metal)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Estimate Button */}
        <View style={{ paddingBottom: 16 }}>
          <TouchableOpacity
            onPress={handleEstimate}
            disabled={selectedMetals.length === 0}
            style={{
              backgroundColor: selectedMetals.length === 0 ? '#9B6BB5' : '#652D8B',
              paddingVertical: 16,
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <CalculatorIcon size={18} color="white" />
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: 'white' }}>
              Estimate Value
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
          onPress={() => setShowDropdown(false)}
        >
          <View style={{
            backgroundColor: 'white',
            marginHorizontal: 16,
            marginTop: 160,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}>
            {metals.map((metal: any, i: number) => (
              <TouchableOpacity
                key={metal._id}
                onPress={() => addMetal(metal)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderBottomWidth: i < metals.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                  backgroundColor: selectedMetals.find(m => m._id === metal._id) ? '#F3E8FF' : 'white',
                }}
              >
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#0F0B18' }}>
                  {metal.name} — ${metal.price}/{metal.unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Result Modal */}
      <CalculatorResultModal
        visible={showResult}
        onClose={() => setShowResult(false)}
        total={getTotal()}
        partsCount={selectedMetals.length}
        selectedMetals={selectedMetals}
        onRequestPickup={() => {
          setShowResult(false);
          router.push({
            pathname: '/requestPickup',
            params: {
              metals: JSON.stringify(selectedMetals),
            },
          } as any);
        }}
      />
    </SafeAreaView>
  );
}