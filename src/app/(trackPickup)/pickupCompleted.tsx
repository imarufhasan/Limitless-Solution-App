import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { useGetAssignmentDetailsQuery } from '@/redux/features/employee/assignmentApi';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import React from 'react';

export default function PickupCompleted() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetAssignmentDetailsQuery({ id });
  const assignment = data?.data
  return (
    <PickupDetailsCard
      buttonLabel="Mark as Completed"
      buttonIcon={CheckCircle}
      onPress={() => router.push("/(employee)/home" as any)}
      assignment={assignment}
    />
  );
}