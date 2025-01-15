import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WalletInfo from "@/components/WalletInfo";

export default function AssetsScreen() {
    return (
        <View style={styles.container}>
            <WalletInfo />
            <Text style={styles.text}>List your Avalanche tokens here.</Text>
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
