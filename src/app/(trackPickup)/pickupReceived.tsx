import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { router } from 'expo-router';
import { Package } from 'lucide-react-native';
import React from 'react';

export default function PickupReceived() {
  return (
    <PickupDetailsCard
      buttonLabel="Mark as Received"
      buttonIcon={Package}
      onPress={() => router.push("/(trackPickup)/pickupCompleted" as any)}
    />
  );
}