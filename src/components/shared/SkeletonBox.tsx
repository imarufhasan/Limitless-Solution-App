// SkeletonCard.tsx — আলাদা component বানান
import React, { useEffect, useRef } from 'react';
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

export function SkeletonCard() {
  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#F1F1F2',
    }}>
      {/* Top Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <SkeletonBox width={44} height={44} borderRadius={22} style={{ marginRight: 10 }} />
        <View style={{ flex: 1, gap: 6 }}>
          <SkeletonBox width="60%" height={14} />
          <SkeletonBox width="40%" height={11} />
        </View>
        <SkeletonBox width={70} height={26} borderRadius={20} />
      </View>

      {/* Details */}
      <View style={{ gap: 8, marginBottom: 12 }}>
        <SkeletonBox width="80%" height={11} />
        <SkeletonBox width="50%" height={11} />
        <SkeletonBox width="65%" height={11} />
      </View>

      {/* Price Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SkeletonBox width="30%" height={13} />
        <SkeletonBox width="20%" height={16} />
      </View>
    </View>
  );
}