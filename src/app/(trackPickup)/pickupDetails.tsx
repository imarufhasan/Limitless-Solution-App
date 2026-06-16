import PickupDetailsCard from "@/components/shared/PickupDetailsCard";
import { useGetAssignmentDetailsQuery, useOnTheWayStatusMutation } from "@/redux/features/employee/assignmentApi";
import { router, useLocalSearchParams } from "expo-router";
import { Navigation } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";
import { toast } from "sonner-native";

export default function PickupDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetAssignmentDetailsQuery({ id });
  const [onTheWay, { isLoading: OTGLoading }] = useOnTheWayStatusMutation()
  const assignment = data?.data;

  // console.log("PickUpdetails " , assignment?.orderStatus)
  // console.log("aaaa", assignment?.orderId)
  const handleChangeStatus = async (id: string) => {
    try {
      const res = await onTheWay({ id }).unwrap()
      router.push({
        pathname : "/(trackPickup)/pickupReceived",
        params: { id: assignment?._id }
      } as any)
      toast.success(res?.message)

    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }


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
      buttonLabel="On The Way"
      buttonIcon={Navigation}
      onPress={() => handleChangeStatus(assignment?.orderId)}
      assignment={assignment}
    />


  );
}