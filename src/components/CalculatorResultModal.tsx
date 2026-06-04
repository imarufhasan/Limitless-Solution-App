
import { router } from 'expo-router';
import { Calculator } from 'lucide-react-native';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  total: string;
  partsCount: number;
};

export default function CalculatorResultModal({ visible, onClose, total, partsCount }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 24,
        }}>
          {/* Icon */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              backgroundColor: '#652D8B',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}>
              <Calculator size={28} color="white" />
            </View>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280' }}>
              Estimated Total Value
            </Text>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 36, color: '#652D8B', marginTop: 4 }}>
              ${total}
            </Text>
          </View>

          {/* Breakdown */}
          <View style={{
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            paddingTop: 16,
            gap: 12,
            marginBottom: 20,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280' }}>
                Base Value:
              </Text>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: '#0F0B18' }}>
                $2,500
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280' }}>
                Weight (55 lbs):
              </Text>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: '#0F0B18' }}>
                $2,750
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: '#6B7280' }}>
                Parts ({partsCount}):
              </Text>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: '#0F0B18' }}>
                ${total}
              </Text>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={()=> router.push("/requestPickup" as any)}
            style={{
              backgroundColor: '#652D8B',
              paddingVertical: 16,
              borderRadius: 50,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: 'white' }}>
              Request Pickup
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}