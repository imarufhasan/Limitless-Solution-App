import CancelModal from '@/components/CancelModal';
import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import {
  useAcceptAssignmentMutation,
  useCanelAssignmentMutation,
  useGetAssignmentDetailsQuery
} from '@/redux/features/employee/assignmentApi';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { toast } from 'sonner-native';

export default function PendingPickup() {
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetAssignmentDetailsQuery({ id });
  const [acceptAssignment, { isLoading: acceptAssingmentLoading }] = useAcceptAssignmentMutation();
  const [cancelAssignment, { isLoading: cancelLoading }] =useCanelAssignmentMutation() 

  const assignment = data?.data;

  const handleAcceptAssignment = async (id: string) => {
    try {
      const res = await acceptAssignment({ id }).unwrap();
      toast.success(res?.message || "Offer accepted Successfully!");
      router.push('/(employee)/track?tab=accepted');
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleConfirmDecline = async (reason: string) => {
    try {
      const res = await cancelAssignment({
        id: assignment?._id,
        data: { cancelledReason: reason },
      }).unwrap();
      toast.success(res?.message || "Assignment declined");
      setModalVisible(false);
      router.back();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#652D8B" />
      </View>
    );
  }

  return (
    <>
      <PickupDetailsCard
        buttonLabel="Accept"
        buttonIcon={CheckCircle}
        onPress={() => handleAcceptAssignment(assignment?._id)}
        showDecline={true}
        onDecline={() => setModalVisible(true)} 
        status="Pending"
        isLoading={acceptAssingmentLoading}
        assignment={assignment}
      />
      <CancelModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmDecline} 
        isLoading={cancelLoading} 
      />
    </>
  );
}