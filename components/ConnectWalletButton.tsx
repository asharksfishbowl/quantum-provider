// app/components/ConnectWalletButton.tsx

import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWalletConnectContext } from "@/contexts/WalletConnectContext";

export default function ConnectWalletButton() {
    const { connectWallet, isConnected, session } = useWalletConnectContext();

    const handlePress = async () => {
        await connectWallet();
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress} disabled={isConnected}>
            {isConnected ? (
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
            ) : (
                <Ionicons name="wallet-outline" size={24} color="#007AFF" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 12,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        // Optional: Add shadows or borders as needed
    },
});
