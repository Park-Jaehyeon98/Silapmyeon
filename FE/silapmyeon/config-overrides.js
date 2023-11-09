module.exports = {
    // Extend/override the dev server configuration used by CRA
    // See: https://github.com/timarney/react-app-rewired#extended-configuration-options
    devServer(configFunction) {
      return function (proxy, allowedHost) {
        const config = configFunction(proxy, allowedHost);
        // Set loose allow origin header to prevent CORS issues
        config.headers = {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        };
        return config;
      };
    },
  };