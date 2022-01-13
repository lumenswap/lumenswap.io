import React from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import BoardItem from 'containers/dao/BoardItem';
import ProposalItem from 'containers/dao/proposals/ProposalItem';
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

  const proposals = [
    {
      id: 1, logo: sampleLogo, status: 'active', detail: 'End in 2 days', address: 'By 0x7384…6trs47', title: 'Will Joe Biden win the 2020 United States presidential election?', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
    },
    {
      id: 2, logo: sampleLogo, status: 'ended', detail: 'Look marketing tokens', address: 'By 0x7384…6trs47', title: 'Will Joe Biden win the 2020 United States presidential election?', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
    },
    {
      id: 3, logo: sampleLogo, status: 'Not started', detail: 'Look marketing tokens', address: 'By 0x7384…6trs47', title: 'Will Joe Biden win the 2020 United States presidential election?', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
    },
  ];

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

              <div className={styles['container-proposals']}>
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h2 className={styles.title}>Proposals</h2>
                  </div>
                  <div className="col-auto" />
                </div>

                {proposals.map((proposal) => (
                  <div className="mt-4" key={proposal.id}>
                    <ProposalItem item={proposal} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default Proposals;
