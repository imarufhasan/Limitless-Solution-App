import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { useAcceptAssignmentMutation, useGetAssignmentDetailsQuery } from '@/redux/features/employee/assignmentApi';
import { useLocalSearchParams } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { toast } from 'sonner-native';

export default function pendingPickup() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading } = useGetAssignmentDetailsQuery({ id });
    const [acceptAssignment , {isLoading : acceptAssingmentLoading}] = useAcceptAssignmentMutation()
    const assignment = data?.data;

    // console.log("Check again", assignment)

    const handleAcceptAssignment = async(id : string)=>{
      try {
        const res = await acceptAssignment({id}).unwrap()
        toast.success(res?.message || "Offer accepted Successfully!")
        
      } catch (error : any) {
        toast.error(error?.data?.message)
      }

    }
    const handleDeclineAssignment = (id : string)=>{
      console.log("declientId " , id)
    } 
    if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#652D8B" />
      </View>
    );
  }
    return (
        <PickupDetailsCard
            buttonLabel="Accept"
            buttonIcon={CheckCircle}
            onPress={() =>handleAcceptAssignment(assignment?._id)}
            showDecline={true}
            onDecline={() =>handleDeclineAssignment(assignment?._id)}
            status="Pending"
            assignment={assignment}
        />
    )
}