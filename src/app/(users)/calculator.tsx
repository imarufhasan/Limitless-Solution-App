import CalculatorResultModal from '@/components/CalculatorResultModal';
import { Calculator as CalculatorIcon, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const parts = [
  { id: "1", name: "Engine", kgPrice: 50, pcPrice: 200 },
  { id: "2", name: "Battery", kgPrice: 20, pcPrice: 45 },
  { id: "3", name: "Catalytic Converter", kgPrice: 30, pcPrice: 120 },
  { id: "4", name: "Radiator", kgPrice: 35, pcPrice: 15 },
  { id: "5", name: "Tires", kgPrice: 10, pcPrice: 25 },
  { id: "6", name: "Transmission", kgPrice: 40, pcPrice: 180 },
  { id: "7", name: "Aluminium Parts", kgPrice: 15, pcPrice: 30 },
  { id: "8", name: "Copper Wiring", kgPrice: 25, pcPrice: 10 },
  { id: "9", name: "Steel Body", kgPrice: 12, pcPrice: 50 },
];

type SelectedPart = {
  id: string;
  name: string;
  kgPrice: number;
  pcPrice: number;
  unit: "kg" | "pc";
  quantity: number;
};

export default function Calculator() {
  const [showResult, setShowResult] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedParts, setSelectedParts] = useState<SelectedPart[]>([]);

  const addPart = (part: typeof parts[0]) => {
    const exists = selectedParts.find((p) => p.id === part.id);
    if (!exists) {
      setSelectedParts([...selectedParts, {
        ...part,
        unit: "pc",
        quantity: 1,
      }]);
    }
    setShowDropdown(false);
  };

  const removePart = (id: string) => {
    setSelectedParts(selectedParts.filter((p) => p.id !== id));
  };

  const updateUnit = (id: string, unit: "kg" | "pc") => {
    setSelectedParts(selectedParts.map((p) => p.id === id ? { ...p, unit } : p));
  };

  const updateQuantity = (id: string, qty: string) => {
    const quantity = parseInt(qty) || 0;
    setSelectedParts(selectedParts.map((p) => p.id === id ? { ...p, quantity } : p));
  };

  const getSubtotal = (part: SelectedPart) => {
    const price = part.unit === "kg" ? part.kgPrice : part.pcPrice;
    return (price * part.quantity).toFixed(2);
  };

  const getTotal = () => {
    return selectedParts.reduce((sum, part) => {
      const price = part.unit === "kg" ? part.kgPrice : part.pcPrice;
      return sum + price * part.quantity;
    }, 0).toFixed(2);
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
              Select a part to add
            </Text>
            <Text style={{ fontSize: 16, color: '#6B7280' }}><ChevronDown /></Text>
          </TouchableOpacity>

          {/* Selected Parts */}
          {selectedParts.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18', marginBottom: 12 }}>
                Selected Parts
              </Text>
              {selectedParts.map((part) => (
                <View key={part.id} style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}>
                  {/* Part Name & Remove */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18' }}>
                      {part.name}
                    </Text>
                    <TouchableOpacity onPress={() => removePart(part.id)}>
                      <Text style={{ color: '#EF4444', fontSize: 18 }}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Unit */}
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#9CA3AF', marginBottom: 8 }}>
                    Unit
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                    <TouchableOpacity
                      onPress={() => updateUnit(part.id, "kg")}
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: part.unit === "kg" ? "#652D8B" : "#F3F4F6",
                      }}
                    >
                      <Text style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 13,
                        color: part.unit === "kg" ? "white" : "#6B7280",
                      }}>
                        lbs (${part.kgPrice}/lbs)
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => updateUnit(part.id, "pc")}
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: part.unit === "pc" ? "#652D8B" : "#F3F4F6",
                      }}
                    >
                      <Text style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 13,
                        color: part.unit === "pc" ? "white" : "#6B7280",
                      }}>
                        pc (${part.pcPrice}/pc)
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Quantity */}
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: '#9CA3AF', marginBottom: 8 }}>
                    Quantity ({part.unit})
                  </Text>
                  <TextInput
                    value={part.quantity.toString()}
                    onChangeText={(val) => updateQuantity(part.id, val)}
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
                      marginBottom: 12,
                    }}
                  />

                  {/* Subtotal */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#9CA3AF' }}>
                      Subtotal
                    </Text>
                    <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: '#652D8B' }}>
                      ${getSubtotal(part)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Calculate Button */}
        <View style={{ paddingBottom: 16 }}>
          <TouchableOpacity onPress={() => setShowResult(true)} style={{
            backgroundColor: '#652D8B',
            paddingVertical: 16,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
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
            {parts.map((part, i) => (
              <TouchableOpacity
                key={part.id}
                onPress={() => addPart(part)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: i === 0 ? '#F3E8FF' : 'white',
                  borderBottomWidth: i < parts.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                }}
              >
                <Text style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: '#0F0B18',
                }}>
                  {part.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      <CalculatorResultModal
        visible={showResult}
        onClose={() => setShowResult(false)}
        total={getTotal()}
        partsCount={selectedParts.length}
      />
    </SafeAreaView>
  );
}