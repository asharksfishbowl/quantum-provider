import React, { useEffect } from "react";
import {View, Text, StyleSheet, Image} from "react-native";

export default function Index() {

    return (
        <View style={styles.container}>
            <Image source={require('../assets/splash.png')} style={styles.headerImage}/>
            <Text style={styles.text}>Loading / Splash Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerImage: {
        width: 350,
        height: 150,
        resizeMode: "contain",
    },
    text: {
        fontSize: 18,
    },
});
