import PickupDetailsCard from "@/components/shared/PickupDetailsCard";
import { useGetAssignmentDetailsQuery, useOnTheWayStatusMutation } from "@/redux/features/employee/assignmentApi";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { CheckCircle, Navigation } from "lucide-react-native";
import { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { toast } from "sonner-native";

export default function PickupDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading , refetch } = useGetAssignmentDetailsQuery({ id });
  const [onTheWay, { isLoading: OTGLoading }] = useOnTheWayStatusMutation()
  const assignment = data?.data;

  useFocusEffect(
    useCallback(() => {
      console.log("MyCloset Screen Focused");

      refetch()
        .then((res) => {
          console.log("Fresh MyCloset Response: ", res?.data);
        })
        .catch((err) => {
          console.log("MyCloset Error:", err);
        });
    }, []),
  );

  const handleChangeStatus = async (id: string) => {
    try {
      const res = await onTheWay({ id }).unwrap()
      router.push({
        pathname: "/(trackPickup)/pickupReceived",
        params: { id: assignment?._id }
      } as any)
      toast.success(res?.message)

    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }
  const handleMarkAsReceived = () => {
    router.push({
      pathname: "/(trackPickup)/pickupReceived",
      params: { id: assignment?._id }
    } as any);
  };


  if (isLoading) {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#652D8B" />
      </View>
    );
  }


  return (
    <PickupDetailsCard
      isLoading={OTGLoading}
      buttonLabel={
        assignment?.orderStatus === 'on_the_way' ? 'Mark as Received' : 'On The Way'
      }
      buttonIcon={
        assignment?.orderStatus === 'on_the_way' ? CheckCircle : Navigation
      }
      onPress={() => {
        if (assignment?.orderStatus === 'on_the_way') {
          handleMarkAsReceived();
        } else {
          handleChangeStatus(assignment?.orderId);
        }
      }}
      assignment={assignment}
    />


  );
}