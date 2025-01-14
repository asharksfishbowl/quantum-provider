import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function HeaderRight() {
    return (
        <View style={styles.container}>
            {/* Button 1 */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("Button 1 pressed")}
            >
                <Text style={styles.buttonText}>Btn1</Text>
            </TouchableOpacity>

            {/* Button 2 */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("Button 2 pressed")}
            >
                <Text style={styles.buttonText}>Btn2</Text>
            </TouchableOpacity>

            {/* Avatar */}
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
