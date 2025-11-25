import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.body}>idk if i can do this but grubbo!</Text>
      <Link href="/saved_tours" style={styles.button}>Saved Tours</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff6eb'
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