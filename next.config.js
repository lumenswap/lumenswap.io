const withTM = require('next-transpile-modules')(['redux-persist']);
const withImages = require('next-images');
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(withImages(withTM({
  env: {
    REACT_APP_HORIZON: process.env.REACT_APP_HORIZON,
    REACT_APP_METRIC_SERVER: process.env.REACT_APP_METRIC_SERVER,
    REACT_APP_LUMENSCAN_URL: process.env.REACT_APP_LUMENSCAN_URL,
    REACT_APP_HOST: process.env.REACT_APP_HOST,
    REACT_APP_LUMEN_API: process.env.REACT_APP_LUMEN_API,
    REACT_APP_OPTIMIZELY_SDK_KEY: process.env.REACT_APP_OPTIMIZELY_SDK_KEY,
    REACT_APP_MODE: process.env.REACT_APP_MODE,
    REACT_APP_PRODUCT_ENV: process.env.REACT_APP_PRODUCT_ENV,
    REACT_APP_LOTTERY_ACCOUNT: process.env.REACT_APP_LOTTERY_ACCOUNT,
    REACT_APP_LUSI_ISSUER: process.env.REACT_APP_LUSI_ISSUER,
  },
  webpack5: false,
  images: {
    domains: ['cdn.lumenswap.io'],
  },
})), sentryWebpackPluginOptions);
