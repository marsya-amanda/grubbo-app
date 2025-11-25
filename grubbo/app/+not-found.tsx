import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFound() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops! Not Found' }} />
            <View style={styles.container}>
                <Link href="/" style={styles.button}>Go to Home</Link>
            </View>
        </>
    )  
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