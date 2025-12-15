import { View, Text, StyleSheet } from "react-native";
import React from 'react';

export default function CreateTourScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Map here, display &quot;you&apos;re not in a tour right now!&quot; if no tour</Text>
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
  map: {
    width: '100%',
    height: '100%'
  }
});

