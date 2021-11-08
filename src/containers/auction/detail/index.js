import Head from 'next/head';
import classNames from 'classnames';

import urlMaker from 'helpers/urlMaker';
import AuctionHeader from 'components/AuctionHeader';
import Breadcrumb from 'components/BreadCrumb';
import Button from 'components/Button';

import styles from './styles.module.scss';

const AuctionDetail = () => {
  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Auction Board | Lumenswap</title>
      </Head>
      <AuctionHeader />
      {children}
    </div>
  );

  const breadCrumbData = [
    {
      name: 'Auction',
      url: urlMaker.auction.root(),
    },
    {
      render: () => (<div>Rabet(RBT)</div>),
    },
  ];

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <Breadcrumb
                data={breadCrumbData}
              />
              <Button
                className={styles.btn}
                content="Send Bid"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuctionDetail;
