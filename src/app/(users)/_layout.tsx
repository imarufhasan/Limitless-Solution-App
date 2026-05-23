import AnimatedTabIcon from '@/components/shared/AnimatedTabIcon'
import { Tabs } from 'expo-router'
import { Home, Package, TrendingUp, User } from 'lucide-react-native'
import React from 'react'

export default function UserTabs() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    height: 100,
                    paddingBottom: 20,
                    paddingTop: 20,
                },
                tabBarActiveTintColor: "#652D8B",
                tabBarInactiveTintColor: "#4F4F59",
            }}
        >
            <Tabs.Screen name="home" options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <AnimatedTabIcon icon={Home} color={color} size={size} focused={focused} label="Home" />
                ),
            }} />
            <Tabs.Screen name="track" options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <AnimatedTabIcon icon={Package} color={color} size={size} focused={focused} label="Track" />
                )
            }} />
            <Tabs.Screen name="calculator" options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <AnimatedTabIcon icon={Package} color={color} size={size} focused={focused} label="Calculator" />
                )
            }} />
            <Tabs.Screen name="market" options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <AnimatedTabIcon icon={TrendingUp} color={color} size={size} focused={focused} label="Market" />
                )
            }} />
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <AnimatedTabIcon icon={User} color={color} size={size} focused={focused} label="Profile" />
                )
            }} />
        </Tabs>
    )
}
