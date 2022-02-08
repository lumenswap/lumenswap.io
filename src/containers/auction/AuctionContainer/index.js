import Head from 'next/head';
import ServerSideLoading from 'components/ServerSideLoading';
import AuctionHeader from '../AuctionHeader';

function AuctionContainer({ title, children }) {
  return (
    <div className="container-fluid">
      <Head>
        <title>{title}</title>
      </Head>
      <AuctionHeader />
      <ServerSideLoading>
        {children}
      </ServerSideLoading>
    </div>
  );
}

export default AuctionContainer;
