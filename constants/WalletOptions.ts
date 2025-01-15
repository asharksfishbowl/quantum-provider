export type WalletOptionType = {
    name: string;
    scheme: string;
    icon: any;
};

export const WalletOptions = [
    {
        name: "MetaMask",
        scheme: "metamask://",
        icon: require("../assets/images/metamask.png"), // adjust as needed
    },
    {
        name: "Phantom",
        scheme: "phantom://",
        icon: require("../assets/images/phantom.png"),
    },
    {
        name: "Coinbase Wallet",
        scheme: "coinbase://",
        icon: require("../assets/images/coinbase.png"),
    },
];
