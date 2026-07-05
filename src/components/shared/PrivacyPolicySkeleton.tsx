// SkeletonLine.tsx — reusable animated skeleton
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

function SkeletonBox({ width, height, borderRadius = 8, style }: {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
}) {
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
      style={[{ width, height, borderRadius, backgroundColor: '#F1F1F2', opacity }, style]}
    />
  );
}

export function PrivacyPolicySkeleton() {
  const lines = [95, 80, 90, 70, 85, 60, 88, 75, 92, 65, 78, 83];

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      {/* Back button skeleton */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 8 }}>
        <SkeletonBox width={32} height={32} borderRadius={16} />
        <SkeletonBox width={120} height={18} />
      </View>

      {/* Card skeleton */}
      <View
        style={{
          backgroundColor: '#F1F1F2',
          borderRadius: 8,
          padding: 16,
          marginTop: 8,
          gap: 10,
        }}
      >
        {lines.map((w, i) => (
          <SkeletonBox key={i} width={`${w}%`} height={14} />
        ))}
      </View>
    </View>
  );
}