import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
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
import useIsLogged from 'hooks/useIsLogged';
import ProposalForm from './ProposalForm';

import styles from './styles.module.scss';

const Container = ({ children, info }) => (
  <div className="container-fluid">
    <Head>
      <title>Create Proposal | Lumenswap</title>
    </Head>
    <DAOHeader asset={info.asset} />
    {children}
  </div>
);

const CreateProposal = ({ info }) => {
  const [status, setStatus] = useState('');
  const router = useRouter();
  const isLogged = useIsLogged();

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: info.name },
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

    useEffect(() => {
      if (!isLogged) {
        router.push(urlMaker.dao.root());
      }
    }, [isLogged]);

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
    <Container info={info}>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">

              <Breadcrumb
                spaceBetween={8}
                data={crumbData}
              />

              {renderContent()}
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default CreateProposal;
