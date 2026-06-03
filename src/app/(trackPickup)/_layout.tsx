import { Stack } from "expo-router";
export default function TrackPickupLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#fff" },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="pickupDetails" />

        </Stack>
    );
}
