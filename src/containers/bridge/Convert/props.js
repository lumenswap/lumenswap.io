import { getBridgeDefaultSelectedTokens } from 'api/mockAPI/bridgeTokens';

export async function bridgeConvertGetServerSideProps() {
  try {
    const defaultSelectedTokens = await getBridgeDefaultSelectedTokens();
    return {
      props: {
        defaultSelectedTokens,
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
