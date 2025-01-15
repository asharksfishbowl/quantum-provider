import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function HeaderRight() {

    return (
        <View style={styles.container}>
            <ConnectWalletButton />
            <TouchableOpacity onPress={() => console.log("Avatar pressed")}>
                <Image
                    source={{ uri: "https://i.pravatar.cc/300" }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginRight: 12,
        alignItems: "center",
    },
    button: {
        marginRight: 12,
    },
    buttonText: {
        color: "#007AFF",
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});
