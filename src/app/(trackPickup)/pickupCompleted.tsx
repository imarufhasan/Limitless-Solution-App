import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { useCompleteOrderStatusMutation, useGetAssignmentDetailsQuery } from '@/redux/features/employee/assignmentApi';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import React from 'react';
import { toast } from 'sonner-native';

export default function PickupCompleted() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetAssignmentDetailsQuery({ id });

  const [receivedAssignment, { isLoading }] = useCompleteOrderStatusMutation()
  const assignment = data?.data


  // console.log(" receivedss ", assignment)
  const handleChangeStatus = async (id: string) => {
    // console.log("received Id", id)
    try {
      const res = await receivedAssignment({ id }).unwrap()
      router.push({
        pathname: "/(employee)/home",
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
      buttonLabel="Mark as Completed"
      isLoading={isLoading}
      buttonIcon={CheckCircle}
      // onPress={() => router.push("/(employee)/home" as any)}
      onPress={() => handleChangeStatus(assignment?.orderId)}
      assignment={assignment}
    />
  );
}