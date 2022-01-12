import React from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import BoardItem from 'containers/dao/BoardItem';
import urlMaker from 'helpers/urlMaker';
import Breadcrumb from 'components/BreadCrumb';
import sampleLogo from 'assets/images/btc-logo.png';

import styles from './styles.module.scss';

const Proposals = () => {
  const router = useRouter();
  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>proposals | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { name: router.query.name },
  ];

  const bordItem = {
    logo: sampleLogo, web: 'Rabet.io', webLink: '/', assetLink: '/', name: 'Lumenswap', desc: 'Lumenswap is a decentralized exchange built on the Stellar network that allows you to swap and trade assets using a friendly, minimal interface.', proposals: '1', member: '110,000', tiker: 'LSP',
  };

  return (
    <Container>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <Breadcrumb
                spaceBetween={8}
                data={crumbData}
              />
              <div className="mt-4">
                <BoardItem item={bordItem} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default Proposals;
