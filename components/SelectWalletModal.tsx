// SelectWalletModal.tsx
import React, { useState } from "react";
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import {WalletOptions, WalletOptionType} from "@/constants/WalletOptions";
import { connectWallet, openWalletApp } from "@/utils/WalletConnectUtils";

export default function SelectWalletModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    const [loading, setLoading] = useState(false);

    async function handleWalletSelect(wallet: WalletOptionType) {
        try {
            setLoading(true);
            console.log("Connecting wallet:", wallet);
            await connectWallet(wallet);
            onClose();
        } catch (err) {
            console.error("Error connecting wallet:", err);
        } finally {
            setLoading(false);
        }
    }

    async function onQuatumWallet() {
        try {
            setLoading(true);
            console.log("Connecting wallet: Quantum App Wallet");
            onClose();
        } catch (err) {
            console.error("Error connecting wallet:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Choose a Wallet</Text>
                    { WalletOptions.map((wallet: WalletOptionType) => (
                        <TouchableOpacity
                            key={wallet.name}
                            style={styles.walletItem}
                            onPress={() => handleWalletSelect(wallet)}
                            disabled={loading}
                        >
                            <Image source={wallet.icon} style={styles.walletIcon} />
                            {/*<Text style={styles.walletName}>{wallet.name}</Text>*/}
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={onQuatumWallet} style={styles.quantumButton}>
                        <Image source={require('../assets/splash.png')} style={styles.walletIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={{ color: "#fff" }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    container: {
        margin: 24,
        padding: 24,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center",
    },
    walletItem: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 16,
    },
    walletIcon: {
        width: '100%',
        height: 64,
    },
    walletName: {
        fontSize: 16,
    },
    quantumButton: {
        marginTop: 12,
        backgroundColor: "#ffffff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButton: {
        marginTop: 12,
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
});
