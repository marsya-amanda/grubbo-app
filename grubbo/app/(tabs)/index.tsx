import { Text, View, StyleSheet } from "react-native";
import TopReceipt from "../components/topReceipt.jsx";
import BottomReceipt from "../components/bottomReceipt.jsx";
import { useFonts } from "expo-font";


export default function Index() {
  const [fontsLoaded] = useFonts({
    'BethEllen-Regular': require('../../assets/fonts/bethellen-regular.ttf'),
    'BobbyJones': require('../../assets/fonts/bobby-jones.otf'),
    'CopperPlate': require('../../assets/fonts/copperplate-gothic-std-29-bc.ttf'),
    'SpriteGraffiti': require('../../assets/fonts/sprite-graffiti.otf')
  });

  return (
    <View
      style={styles.container}
    >
      <TopReceipt />

      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.grubboText}>GRUBBO</Text>
        </View>
      </View>

      <BottomReceipt />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#B5C7E7'
  },
  main: {
    backgroundColor: "#fff3eb",
    width: 350,
    height: 613,
    display: 'flex',
    flexDirection: 'row'
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    alignContent: 'center',
    alignItems: 'center'
  },
  grubboText: {
    fontFamily: 'SpriteGraffiti',
    fontSize: 42,
    color: '#334360'
  },
  fieldTitle: {

  },
  planButton: {

  },
  body: {
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: "#334360"
  },
  button: {
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: "#d444a4a",
    textDecorationLine: "underline"
  }
});