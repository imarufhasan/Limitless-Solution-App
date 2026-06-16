import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { useGetAssignmentDetailsQuery } from '@/redux/features/employee/assignmentApi';
import { useLocalSearchParams } from 'expo-router';
import { Package } from 'lucide-react-native';
import React from 'react';

export default function PickupReceived() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetAssignmentDetailsQuery({ id });


  const assignment = data?.data

  // console.log(" hello ", assignment)
  const handleChangeStatus = () =>{
    // router.push("/(trackPickup)/pickupCompleted" as any)
  }
  return (
    <PickupDetailsCard

      buttonLabel="Mark as Received"
      buttonIcon={Package}
      onPress={() => handleChangeStatus()}
      assignment={assignment}

    />
  );
}