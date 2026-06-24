import { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
};

export default function CancelModal({ visible, onClose, onConfirm, isLoading }: Props) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleClose}
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}
      >
        {/* Modal Card — touch এখানে block হবে */}
        <TouchableOpacity activeOpacity={1} style={{ width: '100%' }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 15,
          }}>
            {/* Header */}
            {/* <View style={{ marginBottom: 16 }}>
              <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 18, color: '#0F0B18' }}>
                Decline Assignment
              </Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>
                Please provide a reason for declining
              </Text>
            </View> */}

            {/* Divider */}
            {/* <View style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 16 }} /> */}

            {/* Reason Input */}
            <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 13, color: '#374151', marginBottom: 8 }}>
              Reason <Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="e.g. Not available at this time..."
              placeholderTextColor="#D1D5DB"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                color: '#0F0B18',
                borderWidth: 1,
                borderColor: reason.length > 0 ? '#652D8B' : '#E5E7EB',
                borderRadius: 12,
                padding: 12,
                minHeight: 75,
                backgroundColor: '#FAFAFA',
              }}
            />
            {/* <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 11, color: '#9CA3AF', marginTop: 6, textAlign: 'right' }}>
              {reason.length} characters
            </Text> */}

            {/* Buttons */}
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
              <TouchableOpacity
                onPress={handleClose}
                disabled={isLoading}
                style={{
                  flex: 1,
                  paddingVertical: 13,
                  borderRadius: 50,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
              >
                <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#374151' }}>
                  Go Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                disabled={isLoading || reason.trim().length === 0}
                style={{
                  flex: 1,
                  paddingVertical: 13,
                  borderRadius: 50,
                  alignItems: 'center',
                  backgroundColor: reason.trim().length === 0 ? '#D8B4FE' : '#652D8B',
                }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: 'white' }}>
                    Confirm
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}