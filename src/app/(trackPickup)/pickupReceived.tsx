import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { useGetAssignmentDetailsQuery, useReceivedOrderStautsMutation } from '@/redux/features/employee/assignmentApi';
import { router, useLocalSearchParams } from 'expo-router';
import { Package } from 'lucide-react-native';
import React from 'react';
import { toast } from 'sonner-native';

export default function PickupReceived() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetAssignmentDetailsQuery({ id });
  const [receivedAssignment, { isLoading: lodingReceived }] = useReceivedOrderStautsMutation()

  const assignment = data?.data

  const handleChangeStatus = async(id: string) => {
    try {
      const res = await receivedAssignment({ id }).unwrap()
      router.push({
        pathname: "/(trackPickup)/pickupCompleted",
        params: { id: assignment?._id }
      } as any)
      toast.success(res?.message)

    } catch (error: any) {
      toast.error(error?.data?.message)
    }
    // router.push("/(trackPickup)/pickupCompleted" as any)
  }
  return (
    <PickupDetailsCard
      isLoading={lodingReceived}
      buttonLabel="Mark as Received"
      buttonIcon={Package}
      onPress={() => handleChangeStatus(assignment?.order)}
      assignment={assignment}

    />
  );
}