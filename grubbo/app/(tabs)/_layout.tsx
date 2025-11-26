import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
//import { SplashScreen } from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    'BethEllen-Regular': require('../../assets/fonts/bethellen-regular.ttf'),
    'BobbyJones': require('../../assets/fonts/bobby-jones.otf'),
    'CopperPlate': require('../../assets/fonts/copperplate-gothic-std-29-bc.ttf'),
    'SpriteGraffiti': require('../../assets/fonts/sprite-graffiti.otf')
  });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  return (
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: '#d44a4a',
            tabBarInactiveTintColor: '#fff6eb',
            tabBarStyle: {
                backgroundColor: '#334360',
                borderTopColor: '#334360',
                borderBottomColor: '#334360',
                borderLeftColor: '#334360',
                borderRightColor: '#334360',
                borderWidth: 1,
                borderRadius: 20,
                position: 'absolute',
                overflow: 'hidden',
                margin: 15,
                height: 60,
                display: 'flex',
                flexDirection: 'row'
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
            headerStyle: 'none',
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