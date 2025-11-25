import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="current-tour"
        options={{
          title: "Current Tour",
          headerStyle: { backgroundColor: "#fff6eb" },
          headerTintColor: "#334360",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
