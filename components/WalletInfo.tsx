// app/components/WalletInfo.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWalletConnectContext } from "@/contexts/WalletConnectContext";

export default function WalletInfo() {
    const { isConnected, accounts } = useWalletConnectContext();

    if (!isConnected) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Connected Account:</Text>
            <Text style={styles.address}>{accounts?.[0]}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        margin: 12,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    address: {
        color: "#333",
        wordWrap: "break-all",
    },
});
