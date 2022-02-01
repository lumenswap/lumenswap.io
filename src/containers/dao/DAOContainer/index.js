import Head from 'next/head';
import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from '../DAOHeader';

const DAOContainer = ({ children, title, info }) => (
  <div className="container-fluid">
    <Head>
      <title>{title}</title>
    </Head>
    <DAOHeader asset={info && info.asset} assetBoxColor={info && info.assetColor} />
    <ServerSideLoading>
      {children}
    </ServerSideLoading>
  </div>
);

export default DAOContainer;
