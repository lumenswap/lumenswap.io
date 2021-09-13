import optimizely from 'modules/optimizely';

const test = () => (
  <div>
    test
  </div>
);

export default test;

export async function getServerSideProps() {
  optimizely.onReady().then(() => {
    if (optimizely.isFeatureEnabled('amm', '1')) {
      console.log('enabled');
    }
  });

  return {
    props: {},
  };
}
