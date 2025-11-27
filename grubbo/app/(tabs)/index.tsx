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
          <Text style={styles.grubboText}>GRUBBO'S</Text>
          <Text style={styles.secondaryText}>PLAN TOUR</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>Start</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>End</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>Price{'\n'}Rating</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>Mode of{'\n'}Transport</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.keywordTitle}>Some keywords for the tour..</Text>
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
    backgroundColor: '#B5C7E7',
    padding: 0
  },
  main: {
    backgroundColor: "#fff3eb",
    width: 350,
    height: 613,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    width: '92%',
    height: '15%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    marginBottom: 10,
    borderBottomColor: '#334360',
    borderBottomWidth: 3,
    alignContent: 'center',
    alignItems: 'center'
  },
  grubboText: {
    fontFamily: 'SpriteGraffiti',
    fontSize: 42,
    color: '#334360',
    padding: 0,
    margin: 0
  },
  secondaryText: {
    fontFamily: 'BobbyJones',
    fontSize: 24,
    color: '#334360',
    padding: 0,
    margin: 0,
    lineHeight: 15
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopColor: '#334360',
    borderTopWidth: 2,
    width: '92%',
    height: '10%',
    margin: 0,
    padding: 0
  },
  fieldTitle: {
    fontFamily: 'BethEllen-Regular',
    fontSize: 14,
    color: '#d44a4a',
    padding: 0,
    margin: 0,
    transform: [{rotate: '351.5deg'}],
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 5
  },
  keywordTitle: {
    fontFamily: 'BethEllen-Regular',
    fontSize: 14,
    color: '#d44a4a',
    padding: 0,
    margin: 0,
    textAlign: 'left',
    width: '98%'
  },
  planButton: {
    fontFamily: 'BethEllen-Regular',
    fontSize: 30
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