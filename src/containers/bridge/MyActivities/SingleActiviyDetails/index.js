import moment from 'moment';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import InfoBox from 'components/InfoBox';
import ArrowRight from 'assets/images/arrowRight';
import minimizeAddress from 'helpers/minimizeAddress';
import humanizeAmount from 'helpers/humanizeAmount';
import useRequiredLogin from 'hooks/useRequiredLogin';
import StatusLabel from '../StatusLabel';
import styles from './styles.module.scss';

const SingleActivityDetails = ({ activityInfo }) => {
  useRequiredLogin(urlMaker.bridge.root());

  const breadCrumbData = [
    {
      name: 'My activities',
      url: urlMaker.bridge.activity.root(),
    }, {
      name: `${activityInfo.orderID}`,
    }];

  const singleActivityInfo = [
    {
      title: 'Status',
      render: () => <StatusLabel status={activityInfo.status} />,
    },
    {
      title: 'Order ID',
      render: () => `${activityInfo.orderID}`,
    },
    {
      title: 'Date',
      render: () => `${moment(activityInfo.date).fromNow()}`,
    },
    {
      title: 'Destination',
      render: () => (
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="color-primary"
        >{minimizeAddress(activityInfo.destination)}
        </a>
      ),
    },
    {
      title: 'Amount',
      render: () => (
        <div className={styles.amount}>
          {humanizeAmount(activityInfo.asset1.amount)} {activityInfo.asset1.code}
          <ArrowRight />
          {humanizeAmount(activityInfo.asset2.amount)} {activityInfo.asset2.code}
        </div>
      ),
    },
    {
      title: 'Sending TX',
      render: () => (
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="color-primary"
        >{minimizeAddress(activityInfo.sending_tx, 8)}
        </a>
      ),
    },
    {
      title: 'Receiving TX',
      render: () => (
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="color-primary"
        >{minimizeAddress(activityInfo.reciving_tx, 8)}
        </a>
      ),
    },
  ];

  return (
    <BridgeContainer title="Bridge Activity Detail | Lumenswap">
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <Breadcrumb data={breadCrumbData} />

            <InfoBox
              data={activityInfo}
              rows={singleActivityInfo}
              className={styles.info}
            />
          </div>
        </div>
      </div>
    </BridgeContainer>
  );
};

export default SingleActivityDetails;
