import Head from 'next/head';
import ServerSideLoading from 'components/ServerSideLoading';
import BridgeHeader from '../BridgeHeader';

const BridgeContainer = ({ children, title }) => (
  <div className="container-fluid">
    <Head>
      <title>{title}</title>
    </Head>
    <BridgeHeader />
    <ServerSideLoading>
      {children}
    </ServerSideLoading>
  </div>
);

export default BridgeContainer;
