import optimizely from '@optimizely/optimizely-sdk';
import { useState } from 'react';

optimizely.setLogLevel('ERROR');
optimizely.setLogger(optimizely.logging.createLogger());

if (process.env.APP_ENV === 'production') {
  optimizely.setLogger(null);
}

const optimizelyClient = optimizely.createInstance({
  sdkKey: process.env.REACT_APP_OPTIMIZELY_SDK_KEY,
});

export default function useOptimizely(featureFlag) {
  const [enabled, setEnabled] = useState(false);
  optimizelyClient.onReady().then(() => {
    setEnabled(optimizelyClient.isFeatureEnabled(featureFlag, '1'));
  });
  return enabled;
}
