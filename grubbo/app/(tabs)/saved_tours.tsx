import { Text, View, StyleSheet } from 'react-native';

export default function SavedTours() {
  return (
    <View style={styles.container}>
      <Text style={styles.body}>Saved Tours</Text>
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
    color: "#d44a4a"
  }
});