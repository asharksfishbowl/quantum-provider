declare module 'react-native-config' {
    export interface NativeConfig {
        WALLETCONNECT_PROJECT_ID: string,
        API_BASE_URL: string
    }

    export const Config: NativeConfig
    export default Config
}