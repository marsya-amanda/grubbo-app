import { View, Text, StyleSheet } from "react-native";

export default function CreateTourScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a new tour</Text>
      <Text style={styles.subtitle}>Build your custom experience here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff6eb",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#d44a4a",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#334360",
    textAlign: "center",
  },
});

