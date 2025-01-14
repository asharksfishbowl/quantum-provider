import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Index() {
    const router = useRouter();

    // useEffect(() => {
    //     // Maybe show a splash or loading screen here...
    //     // Then navigate to the root route which triggers our auth check
    //     router.replace("/");
    // }, []);

    return (
        <View style={styles.container}>
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
    text: {
        fontSize: 18,
    },
});
