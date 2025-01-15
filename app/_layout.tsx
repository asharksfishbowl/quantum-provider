import React from "react";
import AuthProvider from "@/contexts/AuthContext";
import AuthChecker from "@/components/AuthChecker";

export default function RootLayout() {
  return (
      <AuthProvider>
          <AuthChecker />
      </AuthProvider>
  );
}
