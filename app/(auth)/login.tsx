import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";

export default function Login() {
    const { setIsAuthenticated } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginPress = () => {
        setIsAuthenticated(true);
        router.replace("/(tabs)/home");
    };

    const handleBiometricLogin = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                alert("Biometric hardware not available on this device.");
                return;
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isEnrolled) {
                alert("No biometric credentials enrolled.");
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Log in with Biometrics",
            });

            if (result.success) {
                setIsAuthenticated(true);
                router.replace("/(tabs)/home");
            } else {
                alert("Biometric authentication failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Biometric authentication error.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/splash.png')} style={styles.headerImage}/>

            <Text style={styles.headerText}>Providers Please Log In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                <Ionicons
                    name="log-in-outline"
                    color="#fff"
                    size={20}
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.biometricText}>Or Log In with Biometric</Text>

            <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin}>
                <Ionicons
                    name="finger-print-outline"
                    color="#fff"
                    size={20}
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Use Face/Touch ID</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    headerImage: {
        width: 350,
        height: 150,
        resizeMode: "contain",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 32,
    },
    biometricText: {
        fontSize: 24,
        fontWeight: "600",
        marginTop: 32,
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    biometricButton: {
        flexDirection: "row",
        marginTop: 16,
        backgroundColor: "#132c6b",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
