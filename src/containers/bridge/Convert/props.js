import getBridgeTokens from 'api/birdgeAPI/bridgeTokens';

export async function bridgeConvertGetServerSideProps() {
  try {
    const bridgeTokens = await getBridgeTokens();
    return {
      props: {
        bridgeTokens,
      },
    };
  } catch (e) {
    throw new Error('failure in network you can try again');
  }
}
