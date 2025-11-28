import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
//import { SplashScreen } from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function TabLayout() {

  return (
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: '#d44a4a',
            tabBarInactiveTintColor: '#fff6eb',
            tabBarStyle: {
                backgroundColor: '#d44a4a',
                borderRadius: 80,
                position: 'absolute',
                overflow: 'hidden',
                margin: 15,
                height: 70,
                width: 303,
            },
            tabBarItemStyle: {
              height: '100%',
              padding: 0,
              margin: 10,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column' // isnt really working, when i expand window it makes label and logo in one line
            },
            tabBarIconStyle: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 0, // Remove any default bottom margin
              padding: 0
            },
            tabBarLabelStyle: {
              flex: 2,
              fontSize: 12,
              marginTop: 8,
              paddingBottom: 0,
              fontFamily: 'BobbyJones'
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
        }}
    >
      <Tabs.Screen name="index" options={{ title: 'Plan!', headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} />
      }} />
      <Tabs.Screen name="current-tour" options={{ title: 'Current Tour', headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="play" size={24} color={color} />
      }} />
      <Tabs.Screen name="saved_tours" options={{ title: 'Saved Tours', headerShown: false,
        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
      }} />
    </Tabs>
  );
}