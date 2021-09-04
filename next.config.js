const withTM = require('next-transpile-modules')(['redux-persist']);
const withImages = require('next-images');

module.exports = withImages(withTM({
  env: {
    REACT_APP_HORIZON: process.env.REACT_APP_HORIZON,
    REACT_APP_METRIC_SERVER: process.env.REACT_APP_METRIC_SERVER,
    REACT_APP_LUMENSCAN_URL: process.env.REACT_APP_LUMENSCAN_URL,
    REACT_APP_HOST: process.env.REACT_APP_HOST,
    REACT_APP_LUMEN_API: process.env.REACT_APP_LUMEN_API,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/market',
        permanent: true,
      },
    ];
  },
  webpack5: false,
}));
