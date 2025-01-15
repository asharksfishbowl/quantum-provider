import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WalletInfo from "@/components/WalletInfo";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Quantum WiFi Provider</Text>
            <WalletInfo /> // TODO:: This probaly should be moved to the assets tab
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
});
