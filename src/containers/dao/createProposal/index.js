import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ServerSideLoading from 'components/ServerSideLoading';
import Breadcrumb from 'components/BreadCrumb';
import DAOHeader from 'containers/dao/DAOHeader';
import urlMaker from 'helpers/urlMaker';
import useIsLogged from 'hooks/useIsLogged';
import GeneratePAgeWithStatus from './GeneratePageWithStatus';
import styles from './styles.module.scss';

const Container = ({ children, info }) => (
  <div className="container-fluid">
    <Head>
      <title>Create Proposal | Lumenswap</title>
    </Head>
    <DAOHeader asset={info.asset} assetBoxColor={info.assetColor} />
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

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.dao.root());
    }
  }, [isLogged]);

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

              <GeneratePAgeWithStatus status={status} setStatus={setStatus} info={info} />
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default CreateProposal;
