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
    if (e.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw e;
  }
}
