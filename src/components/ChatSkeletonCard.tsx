import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

function SkeletonBox({ width, height, borderRadius = 8, style }: any) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[{ width, height, borderRadius, backgroundColor: '#E5E7EB', opacity }, style]}
    />
  );
}

export function ChatSkeletonCard() {
  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 14,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F3F4F6',
    }}>
      {/* Content */}
      <View style={{ flex: 1, gap: 6 }}>
        <SkeletonBox width="50%" height={14} />
        <SkeletonBox width="30%" height={11} />
        <SkeletonBox width="70%" height={12} />
      </View>

      {/* Right */}
      <View style={{ alignItems: 'flex-end', gap: 8 }}>
        <SkeletonBox width={36} height={11} />
        <SkeletonBox width={20} height={20} borderRadius={10} />
      </View>
    </View>
  );
}