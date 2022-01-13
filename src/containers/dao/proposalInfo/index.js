import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ServerSideLoading from 'components/ServerSideLoading';
import Breadcrumb from 'components/BreadCrumb';
import DAOHeader from 'containers/dao/DAOHeader';
import urlMaker from 'helpers/urlMaker';
import Progressbar from 'components/Progressbar';

import styles from './styles.module.scss';

const ProposalInfo = () => {
  const router = useRouter();

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Proposal Info | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.root()}/${router.query.name}`, name: router.query.name },
    { name: 'Proposal info' },
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

              <div className={classNames(styles.card, 'mt-4')}>
                <h3 className={styles['card-title']}>Will Joe Biden win the 2020 United
                  States presidential election?
                </h3>
                <div className="mt-4">
                  <Progressbar label="Yes" value={80} />
                </div>
                <div className="mt-4">
                  <Progressbar label="No" value={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default ProposalInfo;
