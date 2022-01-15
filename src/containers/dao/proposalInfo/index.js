import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import ServerSideLoading from 'components/ServerSideLoading';
import Breadcrumb from 'components/BreadCrumb';
import DAOHeader from 'containers/dao/DAOHeader';
import urlMaker from 'helpers/urlMaker';
import Progressbar from 'components/Progressbar';
import Button from 'components/Button';
import ArrowIcon from 'assets/images/angleRight';
import InfoBox from 'components/InfoBox';
import sampleLogo from 'assets/images/btc-logo.png';

import moment from 'moment';
import styles from './styles.module.scss';
import CTable from '../../../components/CTable';
import { generateAddressURL, generateTransactionURL } from '../../../helpers/explorerURLGenerator';
import minimizeAddress from '../../../helpers/minimizeAddress';
import eyeShowIcon from '../../../assets/images/eye-show-icon.png';
import NoData from '../../../components/NoData';
import CSeeAllContentsButton from '../../../components/CSeeAllContentsButton';

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

  const roundInfo = [
    {
      title: 'Proposal ID',
      externalLink: {
        title: 'CBhQN1FK…ARGv8CWH',
        url: '/',
      },
    },
    {
      title: 'Duration',
      render: () => (<>14 days</>),
    },
    {
      title: 'Start time',
      render: () => (<>Dec-08-2020 11:31 AM +UTC</>),
    },
    {
      title: 'End time',
      render: () => (<>Dec-08-2020 11:31 AM +UTC</>),
    },
    {
      title: 'Total voter',
      render: () => (<>743,386</>),
    },
    {
      title: 'Proposer',
      externalLink: {
        title: '3P2p…rb4P',
        url: '/',
      },
    },
    {
      title: 'Govermant',
      render: () => (
        <div className="d-flex align-items-center">
          <Image src={sampleLogo} height={24} width={24} />
          <div className="ml-1">Rabet</div>
        </div>
      ),
    },
  ];

  const tableInfo = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: '1',
      render: () => (
        <a
          className="text-decoration-none"
          target="_blank"
          rel="noreferrer"
        >3P2p…rb4P
        </a>
      ),
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      key: '2',
      render: () => (<>Yes</>),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: () => (<>100 RBT</>),
    },
  ];

  const NoDataMessage = () => (<NoData message="There is no votes" />);

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

                <Button
                  variant="primary"
                  className={styles.btn}
                >
                  Vote <ArrowIcon />
                </Button>
              </div>

              <div className={classNames(styles.card, 'mt-4')}>
                <h4 className={styles['card-title-small']}>Description</h4>
                <p className={styles['card-desc']}>
                  This proposal brings to a formal vote the Retroactive Distribution,
                  discussed at length in the above links.
                  <div className="d-block my-3" />
                  This proposal retroactively distributes 400 UNI to 12,619 distinct
                  addresses who interacted with Uniswap via a proxy contract. These
                  12,619 users are "Phase 1" of the Retroactive Distribution,
                  encompassing users of application-integrations. All of these
                  12,619 addresses were excluded from the original airdrop.
                  <div className="d-block my-3" />
                  The Phase determination was made based on how easy it is to
                  programmatically hook a trading bot into them, as this is a
                  proxy for what portion of these cohorts risk representing multiple
                  addresses per end-user. Phase 1 is the less programmatically
                  accessible cohort, indicating a lower likelihood of multiple
                  addresses per end-user.
                  <div className="d-block my-3" />
                  Specifically, this proposal transfers 5,047,600 UNI to a new
                  MerkleDistributor contract, which will then allow for 400 UNI
                  to be claimed by each of the 12,619 accounts held by users of
                  the following projects:
                </p>
              </div>

              <div className="mt-4">
                <InfoBox
                  rows={roundInfo}
                  data={[{}, {}, {}]}
                  className={styles['row-box']}
                  sidePadding={24}
                  bordered
                />
              </div>

              <div className={classNames(styles.card, 'mt-4 p-0')}>
                <h4 className={classNames(
                  styles['card-title-small'],
                  styles['card-title-table'],
                )}
                >Votes
                </h4>
                <CTable
                  className={styles.table}
                  columns={tableInfo}
                  dataSource={Array(10).fill({})}
                  noDataComponent={NoDataMessage}
                />
              </div>

              <div className="mt-3">
                <CSeeAllContentsButton link="/" content="See all Votes" />
              </div>

            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default ProposalInfo;
