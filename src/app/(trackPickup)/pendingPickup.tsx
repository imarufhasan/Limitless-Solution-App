import PickupDetailsCard from '@/components/shared/PickupDetailsCard';
import { useGetAssignmentDetailsQuery } from '@/redux/features/employee/assignmentApi';
import { useLocalSearchParams } from 'expo-router';
import { CheckCircle, View } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function pendingPickup() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading } = useGetAssignmentDetailsQuery({ id });
    const assignment = data?.data;
    // console.log(assignment)
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
            onPress={() => console.log("Accepted")}
            showDecline={true}
            onDecline={() => console.log("Declined")}
            status="Pending"
            assignment={assignment}
        />
    )
}