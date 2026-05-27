import BackButton from "@/components/shared/BackButton";
import { Package, TrendingUp } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const notifications = [
  {
    id: "1",
    title: "Order Delivered",
    description: "Your order #12345 has been delivered successfully",
    time: "2 min ago",
    icon: Package,
    iconColor: "#652D8B",
    iconBg: "#F3E8FF",
    unread: true,
  },
  {
    id: "2",
    title: "Price Update",
    description: "Copper price increased by 5%",
    time: "1 hour ago",
    icon: TrendingUp,
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
    unread: true,
  },
  {
    id: "3",
    title: "Order Confirmed",
    description: "Your order #12344 has been confirmed",
    time: "3 hours ago",
    icon: Package,
    iconColor: "#652D8B",
    iconBg: "#F3E8FF",
    unread: false,
  },
];

export default function Notifications() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Header */}
     <BackButton title="Notifications" />

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: "#F3F4F6",
              }}
            >
              {/* Icon */}
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: item.iconBg,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Icon size={20} color={item.iconColor} />
              </View>

              {/* Text */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 15,
                    color: "#111827",
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: "#6B7280",
                    marginBottom: 4,
                    lineHeight: 18,
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: "#9CA3AF",
                  }}
                >
                  {item.time}
                </Text>
              </View>

              {/* Unread dot */}
              {item.unread && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#652D8B",
                    marginTop: 4,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}