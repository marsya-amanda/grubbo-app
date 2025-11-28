import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    BethEllen: require("../assets/fonts/bethellen-regular.ttf"),
    BobbyJones: require("../assets/fonts/bobby-jones.otf"),
    CopperPlate: require("../assets/fonts/copperplate-gothic-std-29-bc.ttf"),
    SpriteGraffiti: require("../assets/fonts/sprite-graffiti.otf"),
    PublicSans: require("../assets/fonts/PublicSans-VariableFont_wght.ttf"),
  });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1 }} onLayout={onLayoutRootView} />;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}