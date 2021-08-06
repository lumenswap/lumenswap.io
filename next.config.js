const withTM = require('next-transpile-modules')(['redux-persist']);
const withImages = require('next-images');

module.exports = withImages(withTM({
  env: {
    REACT_APP_HORIZON: process.env.REACT_APP_HORIZON,
    REACT_APP_METRIC_SERVER: process.env.REACT_APP_METRIC_SERVER,
    REACT_APP_LUMENSCAN_URL: process.env.REACT_APP_LUMENSCAN_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: true,
      },
    ];
  },
  webpack5: false,
}));
