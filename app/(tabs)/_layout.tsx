import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="home" />
            <Tabs.Screen name="assets" />
            <Tabs.Screen name="wife" />
            <Tabs.Screen name="settings" />
        </Tabs>
    );
}
