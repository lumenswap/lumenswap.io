import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import InfoBox from 'components/InfoBox';
import StatusLabel from 'containers/bridge/Activity/StatusLabel';
import ArrowRight from 'assets/images/arrowRight';
import styles from './styles.module.scss';
import NextStep from '../../../../components/NextStep';
import Step1 from '../../Convert/BridgeOne/Step1';
import Step2 from '../../Convert/BridgeOne/Step2';
import Step3 from '../../Convert/BridgeOne/Step3';

const ActivityDetail = () => {
  const router = useRouter();

  const breadCrumbData = [
    {
      name: 'My activities',
      url: urlMaker.bridge.activity.root(),
    }, {
      name: `${router.query.id}`,
    }];

  const roundInfo = [
    {
      title: 'Status',
      render: () => <StatusLabel status="pending" />,
    },
    {
      title: 'Order ID',
      render: () => `${router.query.id}`,
    },
    {
      title: 'Date',
      render: () => '1 min ago',
    },
    {
      title: 'Destination',
      render: () => <a href="/" className="color-primary">GCHE…2FK2</a>,
    },
    {
      title: 'Amount',
      render: () => (
        <div className={styles.amount}>
          100 LUSDT
          <ArrowRight />
          100 LUSDT
        </div>
      ),
    },
    {
      title: 'Sending TX',
      render: () => <a href="/" className="color-primary">2jd0n8le…w98ue4ed</a>,
    },
    {
      title: 'Receiving TX',
      render: () => <a href="/" className="color-primary">wkd4n8lo…f93ue4eq</a>,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    { content: <Step1 nextStep={nextStep} /> },
    { content: <Step2 nextStep={nextStep} /> },
    { content: <Step3 nextStep={nextStep} /> },
    { content: <Step3 nextStep={nextStep} /> },
  ];

  return (
    <BridgeContainer title="Bridge Activity Detail | Lumenswap">
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <Breadcrumb data={breadCrumbData} />

            <InfoBox
              data={Array(4).fill({})}
              rows={roundInfo}
              className={styles.info}
            />

            <NextStep currentStep={currentStep} steps={steps} />
          </div>
        </div>
      </div>
    </BridgeContainer>
  );
};

export default ActivityDetail;
