import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ServerSideLoading from 'components/ServerSideLoading';
import Breadcrumb from 'components/BreadCrumb';
import DAOHeader from 'containers/dao/DAOHeader';
import urlMaker from 'helpers/urlMaker';

import styles from './styles.module.scss';

const CreateProposal = () => {
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
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: router.query.name },
    { name: 'Create proposal' },
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
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default CreateProposal;
