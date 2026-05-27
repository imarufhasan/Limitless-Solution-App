import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

type Props = {
  icon: any;
  color: string;
  size: number;
  focused: boolean;
  label: string;
};

export default function AnimatedTabIcon({ icon: Icon, color, size, focused, label }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  }, [focused]);

  return (
    <View style={{
      backgroundColor: focused ? "#652D8B" : "transparent",
      borderRadius: 16,
      paddingHorizontal: 5,
      paddingVertical: 8,
      alignItems: "center",
      minWidth: 60,
      minHeight: 60,
    }}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon color={focused ? "#FFFFFF" : "#4F4F59"} size={size} />
      </Animated.View>
      <Text
        numberOfLines={1}
        style={{
          color: focused ? "#FFFFFF" : "#4F4F59",
          fontSize: 10,
        }}>
        {label}
      </Text>
    </View>
  );
}