import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity } from "react-native";

function FloatingTabBar(props: any) {
  const router = useRouter();

  return (
    <>
      <BottomTabBar {...props} />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/current-tour")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </>
  );
}

export default function TabLayout() {
  return (
    <Tabs 
        tabBar={(props) => <FloatingTabBar {...props} />}
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
      <Tabs.Screen name="index" options={{ title: 'Plan!',
        tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} />
      }} />
      <Tabs.Screen name="saved_tours" options={{ title: 'Saved Tours',
        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
      }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#d44a4a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});