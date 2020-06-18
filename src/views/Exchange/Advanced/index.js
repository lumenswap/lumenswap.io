import React, { useState } from 'react';
import classNames from 'classnames';
import { Collapse } from 'reactstrap';
import angleDown from 'src/assets/images/angle-down-blue.svg';
import DetailTooltip from 'src/shared/components/DetailTooltip';
import CryptoRouteItem from 'src/shared/components/CryptoRouteItem';
import ToleranceGroup from 'src/shared/components/ToleranceGroup';
import { useSelector } from 'react-redux';
import updateCheckout from 'src/actions/checkout/update';
import XLM from 'src/tokens/XLM';
import styles from './styles.less';

const Advanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const checkout = useSelector((state) => state.checkout);

  const routes = [];
  routes.push(checkout.fromAsset);
  if (checkout.fromAsset.issuer !== 'native' && checkout.toAsset.issuer !== 'native') {
    routes.push(XLM);
  }
  routes.push(checkout.toAsset);

  const advanceBtnValue = [
    { value: '0.1' }, { value: '0.5' }, { value: '1.0' }, { value: 'custom' },
  ];

  return (
    <div className={classNames(classNames('shadow-card', styles.card))}>
      <button
        className={styles.open}
        color="primary"
        onClick={toggle}
      >Show advanced
        <img
          src={angleDown}
          width="12px"
          height="8px"
          alt="icon"
          className="d-block ml-auto"
        />
      </button>
      <Collapse isOpen={isOpen}>
        {/* first box */}
        <div className={styles.box} style={{ marginTop: '24px' }}>
          <div className="row justify-content-between">
            <div className={classNames('col-auto', styles.title)}>
              Minimum received
              <DetailTooltip id="eth-tooltip" info="This a tooltip" />
            </div>
            <div className={classNames('col-auto', styles.value)}>
              {(checkout.fromAmount * checkout.counterPrice * (1 - checkout.tolerance)).toFixed(3)}
              {' '}{checkout.toAsset.code}
            </div>
          </div>
          <p className={classNames(styles.title, 'mt-2 pt-1 mb-0')}>
            Set slippage tolerance
            <DetailTooltip id="tolerance-tooltip" info="This a tooltip" />
          </p>
          <ToleranceGroup
            defaultIndex={1}
            values={advanceBtnValue}
            onChange={(x) => {
              if (x !== '' && parseFloat(x)) {
                updateCheckout({
                  tolerance: parseFloat(x) / 100,
                });
              }
            }}
          />
        </div>
        {/* second box */}
        <p className={classNames(styles.title, 'mt-2 mb-0')}>
          Route
          <DetailTooltip id="route-tooltip" info="This a tooltip" />
        </p>
        {/* routes */}
        <div className={styles.box} style={{ marginTop: '2px', padding: '15px 16px' }}>
          <div className="row">
            {routes.map((route, index) => (
              <div className={classNames('col d-flex h-100 align-items-center', styles.col)} key={index}>
                <CryptoRouteItem
                  code={route.code}
                  logo={route.logo}
                  isLast={index === (routes.length - 1)}
                />
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Advanced;
