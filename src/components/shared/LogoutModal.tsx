import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
        className="justify-center items-center px-6"
      >
        <View className="bg-white rounded-2xl px-6 py-8 w-full">
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-[#0F0B18] text-lg text-center mb-6"
          >
            Are you sure Logout your{'\n'}Profile ?
          </Text>

          <View className="flex-row gap-3">
            {/* No */}
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#652D8B',
                borderRadius: 12,
                paddingVertical: 13,
                alignItems: 'center',
              }}
            >
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-[#652D8B] text-base"
              >
                No
              </Text>
            </TouchableOpacity>

            {/* Yes */}
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1,
                backgroundColor: '#652D8B',
                borderRadius: 12,
                paddingVertical: 13,
                alignItems: 'center',
              }}
            >
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-white text-base"
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}