import { useState } from 'react';
import optimizelyClient from 'helpers/optimizely';

export default function useOptimizely(featureFlag) {
  const [enabled, setEnabled] = useState(false);
  optimizelyClient.onReady().then(() => {
    setEnabled(optimizelyClient.isFeatureEnabled(featureFlag, '1'));
  });
  return enabled;
}
