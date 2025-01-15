// app/components/ConnectWalletButton.tsx

import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWalletConnectContext } from "@/contexts/WalletConnectContext";
import SelectWalletModal from "@/components/SelectWalletModal";

export default function ConnectWalletButton() {
    const {isConnected} = useWalletConnectContext();
    const [isModalVisible, setModalVisible] = useState(false);

    const handlePress = async () => {
        setModalVisible(true);
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress} disabled={isConnected}>
            {isConnected ? (
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
            ) : (
                <Ionicons name="wallet-outline" size={24} color="#007AFF" />
            )}
            <SelectWalletModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 12,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
});
