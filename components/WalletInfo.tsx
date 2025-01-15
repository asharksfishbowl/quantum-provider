// app/components/WalletInfo.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWalletConnectContext } from "@/contexts/WalletConnectContext";

export default function WalletInfo() {
    const { isConnected, accounts } = useWalletConnectContext();

    if (!isConnected) {
        return null;
    }

    if (accounts && accounts.length > 0) {
        const info = accounts[0];
        console.log(info);
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Connected Account:</Text>
                <Text style={styles.address}>{info}</Text>
            </View>
        );
    }
    else {
        const info = "No Account Connected"
        console.log(info);
        return (
            <View style={styles.container}>
                <Text style={styles.label}>No Account Connected</Text>
            </View>
        );
    }
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
