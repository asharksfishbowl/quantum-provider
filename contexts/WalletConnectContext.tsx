import React, { createContext, useContext, useEffect, useState } from "react";
import SignClient from "@walletconnect/sign-client";
import { Linking, Alert } from "react-native";
import { WalletOptionType, WalletOptions } from "@/constants/WalletOptions";
import Config from "react-native-config";

type WalletConnectContextType = {
    connectWallet: () => Promise<void>;
    isConnected: boolean;
    session?: any; // Define a proper type based on WalletConnect's session structure
    accounts?: string[]; // Store connected accounts
};

const WalletConnectContext = createContext<WalletConnectContextType>({
    connectWallet: async () => {},
    isConnected: false,
    session: undefined,
    accounts: [],
});

export function WalletConnectProvider({ children }: { children: React.ReactNode }) {
    const [signClient, setSignClient] = useState<SignClient | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [accounts, setAccounts] = useState<string[]>([]);

    useEffect(() => {
        async function initSignClient() {
            try {
                const client = await SignClient.init({
                    projectId: Config.WALLETCONNECT_PROJECT_ID,
                    relayUrl: "wss://relay.walletconnect.com",
                    metadata: {
                        name: "Quantum WiFi Provider",
                        description: "Demo for WalletConnect v2",
                        url: "https://example.com",
                        icons: ["https://myapp.com/favicon.ico"],
                    },
                });

                setSignClient(client);
                console.log("WalletConnect SignClient initialized!");

                // Listen for session updates
                client.on("session_event", (event) => {
                    console.log("Session event:", event);
                });

                client.on("session_update", ({ topic, params }) => {
                    console.log("Session updated:", topic, params);
                });

                client.on("session_delete", ({ topic }) => {
                    console.log("Session deleted:", topic);
                    setIsConnected(false);
                    setSession(null);
                    setAccounts([]);
                });
            } catch (error) {
                console.error("Error initializing SignClient:", error);
            }
        }

        initSignClient();
    }, []);

    async function connectWallet() {
        if (!signClient) {
            Alert.alert("Initialization Error", "WalletConnect is not initialized yet. Please try again.");
            return;
        }

        try {
            const requiredNamespaces = {
                eip155: {
                    methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
                    chains: ["eip155:43114"], // Avalanche C-Chain
                    events: ["accountsChanged", "chainChanged"],
                },
            };

            const { uri, approval } = await signClient.connect({ requiredNamespaces });

            if (uri) {
                // Prompt user to select a wallet
                Alert.alert(
                    "Connect Wallet",
                    "Choose your wallet to connect:",
                    WalletOptions.map((wallet) => ({
                        text: wallet.name,
                        onPress: () => openWallet(wallet, uri),
                    })),
                    { cancelable: true }
                );
            }

            const session = await approval();
            console.log("Wallet connected:", session);

            // Extract accounts from the session
            const eip155Accounts = session.namespaces.eip155.accounts;
            setSession(session);
            setIsConnected(true);
            setAccounts(eip155Accounts);
        } catch (error: any) {
            if (error.message.includes("expired")) {
                Alert.alert("Connection Timeout", "The connection request has expired. Please try again.");
            } else {
                console.error("Error connecting wallet:", error);
                Alert.alert("Connection Error", "An error occurred while connecting your wallet.");
            }
        }
    }

    function openWallet(wallet: WalletOptionType, uri: string) {
        const walletUri = `${wallet.scheme}wc?uri=${encodeURIComponent(uri)}`;
        Linking.openURL(walletUri).catch((err) => {
            console.error(`Could not open ${wallet.name}:`, err);
            Alert.alert(
                "Wallet Not Found",
                `${wallet.name} is not installed on your device. Please install it from the App Store or Play Store.`
            );
        });
    }

    return (
        <WalletConnectContext.Provider value={{ connectWallet, isConnected, session, accounts }}>
            {children}
        </WalletConnectContext.Provider>
    );
}

export function useWalletConnectContext() {
    return useContext(WalletConnectContext);
}
