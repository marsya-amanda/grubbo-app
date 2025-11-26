import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
