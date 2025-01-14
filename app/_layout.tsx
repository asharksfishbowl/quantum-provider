// app/_layout.tsx
import { Stack, useSegments, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AuthProvider, { useAuth } from "@/contexts/AuthContext";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsCheckingAuth(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isAuthenticated && segments[0] !== "(auth)") {
        router.replace("/(auth)/login");
      } else if (isAuthenticated && segments[0] === "(auth)") {
        router.replace("/(tabs)/home");
      }
    }
  }, [isAuthenticated, isCheckingAuth, segments]);

  if (isCheckingAuth) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  return (
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* The (auth) and (tabs) routes should load here, but needs ReactNative 0.76 and above to work */}
        </Stack>
      </AuthProvider>
  );
}
