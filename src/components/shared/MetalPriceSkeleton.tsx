// components/shared/MetalPriceSkeleton.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

function ShimmerBone({ width, height, borderRadius = 6 }: {
    width: number | string;
    height: number;
    borderRadius?: number;
}) {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, [shimmerAnim]);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200],
    });

    return (
        <View
            style={[
                styles.bone,
                { width: width as number, height, borderRadius },
            ]}
        >
            <Animated.View
                style={[
                    styles.shimmerFill,
                    styles.shimmer,
                    { transform: [{ translateX }] },
                ]}
            />
        </View>
    );
}

const ROW_CONFIGS = [
    { nameW: 88, unitW: 52, priceW: 72, changeW: 44, hasTag: true },
    { nameW: 104, unitW: 40, priceW: 80, changeW: 36, hasTag: false },
    { nameW: 72, unitW: 60, priceW: 64, changeW: 40, hasTag: true },
    { nameW: 96, unitW: 44, priceW: 68, changeW: 32, hasTag: false },
    { nameW: 80, unitW: 56, priceW: 76, changeW: 48, hasTag: true },
    { nameW: 112, unitW: 36, priceW: 60, changeW: 36, hasTag: false },
];

export default function MetalPriceSkeleton() {
    return (
        <>
            {ROW_CONFIGS.map((cfg, i) => (
                <View key={i} style={styles.row}>
                    {/* Left — name + unit */}
                    <View style={styles.leftCol}>
                        <View style={styles.nameRow}>
                            <ShimmerBone width={cfg.nameW} height={13} />
                            {cfg.hasTag && (
                                <ShimmerBone width={36} height={16} borderRadius={20} />
                            )}
                        </View>
                        <ShimmerBone width={cfg.unitW} height={11} />
                    </View>

                    {/* Right — price + change */}
                    <View style={styles.rightCol}>
                        <ShimmerBone width={cfg.priceW} height={18} />
                        <ShimmerBone width={cfg.changeW} height={10} />
                    </View>
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginBottom: 8,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.08)',
    },
    shimmerFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    leftCol: {
        gap: 8,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    rightCol: {
        alignItems: 'flex-end',
        gap: 6,
    },
    bone: {
        backgroundColor: '#EFEFEF',
        overflow: 'hidden',
    },
    shimmer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        width: 120,
    },
});