import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onPress: () => void;
  isLoading: boolean;
  text: string;
  loadingText?: string;
};

export default function LoadingButton({ onPress, isLoading, text, loadingText = "Loading..." }: Props) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      const animate = (dot: Animated.Value, delay: number) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, { toValue: -8, duration: 300, useNativeDriver: true }),
            Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
          ])
        ).start();

      animate(dot1, 0);
      animate(dot2, 150);
      animate(dot3, 300);
    } else {
      dot1.setValue(0);
      dot2.setValue(0);
      dot3.setValue(0);
    }
  }, [isLoading]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
      style={{ borderRadius: 50, overflow: 'hidden' }}
    >
      <LinearGradient
        colors={isLoading ? ['#9B6BB5', '#9B6BB5'] : ['#652D8B', '#8718D2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
        }}
      >
        {isLoading ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontFamily: "Inter_500Medium", color: 'white', fontSize: 15, marginRight: 8 }}>
              {loadingText}
            </Text>
            {[dot1, dot2, dot3].map((dot, i) => (
              <Animated.View
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'white',
                  transform: [{ translateY: dot }],
                }}
              />
            ))}
          </View>
        ) : (
          <Text style={{ fontFamily: "Inter_600SemiBold", color: 'white', fontSize: 16 }}>
            {text}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}