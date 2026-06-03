import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { router } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import React from 'react';

export default function PickupCompleted() {
  return (
    <PickupDetailsCard
      buttonLabel="Mark as Completed"
      buttonIcon={CheckCircle}
      onPress={() => router.push("/(employee)/home" as any)}
    />
  );
}