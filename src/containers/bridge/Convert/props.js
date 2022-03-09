import { getBridgeDefaultSelectedTokens } from 'api/mockAPI/bridgeTokens';

export async function bridgeConvertGetServerSideProps() {
  const defaultSelectedTokens = await getBridgeDefaultSelectedTokens();
  return {
    props: {
      defaultSelectedTokens,
    },
  };
}
