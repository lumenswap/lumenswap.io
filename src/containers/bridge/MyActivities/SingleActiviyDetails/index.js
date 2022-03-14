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
import CustomOutsideLink from './CustomOutsideLink';

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
        <CustomOutsideLink
          href="/"
          content={minimizeAddress(activityInfo.destination)}
        />
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
        <CustomOutsideLink
          href="/"
          content={minimizeAddress(activityInfo.sending_tx, 8)}
        />
      ),
    },
    {
      title: 'Receiving TX',
      render: () => (
        <CustomOutsideLink
          href="/"
          content={minimizeAddress(activityInfo.reciving_tx, 8)}
        />
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
