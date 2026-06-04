import { Calendar, CheckCircle, MapPin } from 'lucide-react-native';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onTrack: () => void;
  onHome: () => void;
};

export default function RequestSubmittedModal({ visible, onTrack, onHome }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onHome}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 24,
          width: '100%',
          alignItems: 'center',
        }}>
          {/* Check Icon */}
          <View style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: '#22C55E',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <CheckCircle size={40} color="white"  />
          </View>

          {/* Title */}
          <Text style={{
            fontFamily: "Inter_700Bold",
            fontSize: 20,
            color: '#0F0B18',
            marginBottom: 6,
          }}>
            Request Submitted!
          </Text>
          <Text style={{
            fontFamily: "Inter_400Regular",
            fontSize: 13,
            color: '#6B7280',
            marginBottom: 20,
            textAlign: 'center',
          }}>
            We'll assign an employee shortly
          </Text>

          {/* Details */}
          <View style={{
            backgroundColor: '#F8F6FA',
            borderRadius: 12,
            padding: 14,
            width: '100%',
            gap: 10,
            marginBottom: 20,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <MapPin size={16} color="#652D8B" />
              <View>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: '#9CA3AF' }}>
                  Location
                </Text>
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: '#0F0B18' }}>
                  123 Main Street, Dhaka
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Calendar size={16} color="#652D8B" />
              <View>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: '#9CA3AF' }}>
                  Date
                </Text>
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: '#0F0B18' }}>
                  2026-04-04
                </Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            onPress={onTrack}
            style={{
              backgroundColor: '#652D8B',
              paddingVertical: 14,
              borderRadius: 50,
              alignItems: 'center',
              width: '100%',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: 'white' }}>
              Track Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onHome}
            style={{
              paddingVertical: 14,
              borderRadius: 50,
              alignItems: 'center',
              width: '100%',
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#374151' }}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}