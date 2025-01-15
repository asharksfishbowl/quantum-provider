const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
    const defaultConfig = await getDefaultConfig(__dirname);
    defaultConfig.resolver.extraNodeModules = {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
    };
    return defaultConfig;
})();
