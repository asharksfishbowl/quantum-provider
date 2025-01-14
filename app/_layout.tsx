// app/_layout.tsx
import { Stack, useSegments, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Simulate checking existing token or session
    setTimeout(() => {
      // e.g. found no valid token
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

  // Show a small loader or fallback while checking auth
  if (isCheckingAuth) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  return (
      <Stack screenOptions={{ headerShown: false }}>
        {/* Your (auth) and (tabs) routes will load here */}
      </Stack>
  );
}
