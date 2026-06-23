import { Package } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'



export default function EmptyData({label , margin }  : { label : string , margin : number}) {
    return (
        <View style={{ alignItems: 'center', marginTop: margin, gap: 12 }}>
            <View style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: '#F3E8FF',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Package size={32} color="#652D8B" />
            </View>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: '#0F0B18' }}>
                No {label} tasks
            </Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: '#9CA3AF', textAlign: 'center' }}>
                You have no {label.toLowerCase()} assignments right now
            </Text>
        </View>
    )
}