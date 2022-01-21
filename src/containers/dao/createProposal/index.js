import classNames from 'classnames';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ServerSideLoading from 'components/ServerSideLoading';
import Breadcrumb from 'components/BreadCrumb';
import DAOHeader from 'containers/dao/DAOHeader';
import urlMaker from 'helpers/urlMaker';
import AngleIcon from 'assets/images/angleRight';
import TickIcon from 'assets/images/tick';
import Loading from 'components/Loading';
import Button from 'components/Button';
import ProposalForm from './ProposalForm';

import styles from './styles.module.scss';

const CreateProposal = () => {
  const [status, setStatus] = useState('');
  const router = useRouter();

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Create Proposal | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: router.query.name },
    { name: 'Create proposal' },
  ];

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className={classNames(styles.card, styles['card-small'], styles.loading)}>
          <Loading size={48} />
          <p className={styles['loading-msg']}>
            Please wait, This operation may take a few minutes.
          </p>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className={classNames(styles.card, styles['card-small'], styles.success)}>
          <TickIcon />
          <div className={styles['success-title']}>It’s done</div>
          <p className={styles['success-msg']}>
            Your proposal was successfully created.
          </p>
          <Button variant="primary" className={styles['success-btn']}>
            Proposal page
            <AngleIcon />
          </Button>
        </div>
      );
    }

    return (
      <div className={classNames(styles.card, styles['card-regular'])}>
        <ProposalForm setStatus={setStatus} />
      </div>
    );
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
              <div className={classNames(styles.card, styles['card-regular'])}>
                <ProposalForm setStatus={setStatus} />
              </div>
              {/* {renderContent()} */}
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default CreateProposal;
