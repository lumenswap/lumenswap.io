import optimizelySDK from '@optimizely/optimizely-sdk';

optimizelySDK.setLogLevel('ERROR');
optimizelySDK.setLogger(optimizelySDK.logging.createLogger());

if (process.env.REACT_APP_PRODUCT_ENV === 'production') {
  optimizelySDK.setLogger(null);
}

const optimizelyClient = optimizelySDK.createInstance({
  sdkKey: process.env.REACT_APP_OPTIMIZELY_SDK_KEY,
});

export default optimizelyClient;
