import PickupDetailsCard from "@/components/shared/PickupDetailsCard";
import { router } from "expo-router";
import { Navigation } from "lucide-react-native";

export default function PickupDetails() {
  return (
    <PickupDetailsCard
      buttonLabel="On The Way"
      buttonIcon={Navigation}
      onPress={() => router.push("/(trackPickup)/pickupReceived" as any)}
    />
  );
}