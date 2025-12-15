import { Text, View, StyleSheet } from "react-native";
import TopReceipt from "../components/topReceipt.jsx";
import BottomReceipt from "../components/bottomReceipt.jsx";
import SearchField from "../components/SearchField";
import React, { useState } from 'react';

export default function Index() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  return (
    <View
      style={styles.container}
    >
      <TopReceipt />

      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.grubboText}>GRUBBO&apos;S</Text>
          <Text style={styles.secondaryText}>PLAN TOUR</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>Start</Text>
          <SearchField 
          placeholder="starting at..." 
          value={startLocation}
          onChangeText={setStartLocation}/>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>End</Text>
          <SearchField 
          placeholder="ending at..." 
          value={endLocation}
          onChangeText={setEndLocation}/>
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#B5C7E7',
    padding: '15%'
  },
  main: {
    backgroundColor: "#fff3eb",
    width: 350,
    height: 613,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'scroll'
  },
  titleContainer: {
    width: '92%',
    height: '15%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    borderBottomColor: '#334360',
    borderBottomWidth: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  grubboText: {
    fontFamily: 'SpriteGraffiti',
    fontSize: 42,
    color: '#334360',
    textAlign: 'center'
  },
  secondaryText: {
    fontFamily: 'BobbyJones',
    fontSize: 24,
    color: '#334360',
    padding: 0,
    margin: 0,
    lineHeight: 25
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
    marginTop: 5
  },
  fieldTitle: {
    fontFamily: 'BethEllen-Regular',
    fontSize: 14,
    color: '#d44a4a',
    padding: 0,
    marginTop: 8,
    transform: [{rotate: '351.5deg'}],
    textAlign: 'center',
    lineHeight: 23
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