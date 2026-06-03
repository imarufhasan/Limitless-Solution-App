import PickupDetailsCard from '@/components/shared/PickupDetailsCard'
import { CheckCircle } from 'lucide-react-native'
import React from 'react'

export default function pendingPickup() {
    return (
        <PickupDetailsCard
            buttonLabel="Accept"
            buttonIcon={CheckCircle}
            onPress={() => console.log("Accepted")}
            showDecline={true}
            onDecline={() => console.log("Declined")}
            status="Pending"
        />
    )
}