import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: '#d44a4a',
            tabBarInactiveTintColor: '#334360',
            tabBarStyle: {
                backgroundColor: '#fff6eb',
                borderTopColor: '#334360',
                borderTopWidth: 1,
            },
            headerStyle: {
                backgroundColor: '#fff6eb',
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
        }}
    >
      <Tabs.Screen name="index" options={{ title: 'Plan',
        tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} />
      }} />
      <Tabs.Screen name="saved_tours" options={{ title: 'Saved Tours',
        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
      }} />
    </Tabs>
  );
}