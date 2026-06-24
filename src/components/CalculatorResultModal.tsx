
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onClose: () => void;
  total: string;
  partsCount: number;
  selectedMetals: any[];
  onRequestPickup: () => void;
};

export default function CalculatorResultModal({ visible, onClose, total, partsCount, selectedMetals, onRequestPickup }: Props) {
    const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 ,paddingBottom: insets.bottom + 24, }}>
          {/* Icon */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View style={{
              width: 60, height: 60, borderRadius: 16,
              backgroundColor: '#652D8B', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
            }}>
              <Text style={{ fontSize: 28, color: 'white' }}>$</Text>
            </View>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280' }}>
              Estimated Total Value
            </Text>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 36, color: '#652D8B', marginTop: 4 }}>
              ${total}
            </Text>
          </View>

          {/* Breakdown */}
          <View style={{ borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 16, marginBottom: 20 }}>
            {selectedMetals.map((metal) => (
              <View key={metal._id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280' }}>
                  {metal.name} × {metal.quantity} {metal.unit}
                </Text>
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: '#0F0B18' }}>
                  ${(metal.price * metal.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          {/* Buttons */}
          <TouchableOpacity
            onPress={onRequestPickup}
            style={{
              backgroundColor: '#652D8B', paddingVertical: 16,
              borderRadius: 50, alignItems: 'center', marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: 'white' }}>
              Request Pickup
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={{
              paddingVertical: 16, borderRadius: 50, alignItems: 'center',
              borderWidth: 1, borderColor: '#E5E7EB',
            }}
          >
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: '#374151' }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}