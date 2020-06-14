import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Collapse } from 'reactstrap';
import angleDown from 'Root/assets/images/angle-down-blue.svg';
import DetailTooltip from 'Root/shared/components/DetailTooltip';
import btcLogo from 'Root/assets/images/btc-logo.png';
import ethLogo from 'Root/assets/images/eth-logo.png';
import xlmLogo from 'Root/assets/images/xlm-logo.png';
import CryptoRouteItem from 'Root/shared/components/CryptoRouteItem';
import ToleranceGroup from 'Root/shared/components/ToleranceGroup';
import styles from './styles.less';

const Advanced = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const routes = [
    { name: 'BTC', logo: btcLogo },
    { name: 'ETH', logo: ethLogo },
    { name: 'XLM', logo: xlmLogo },
  ];

  const advanceBtnValue = [
    { value: '0.1' }, { value: '0.5' }, { value: '0.3' }, { value: 'custom' },
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
            <div className={classNames('col-auto', styles.value)}>2952 ETH</div>
          </div>
          <p className={classNames(styles.title, 'mt-2 pt-1 mb-0')}>
             Set slippage tolerance
            <DetailTooltip id="tolerance-tooltip" info="This a tooltip" />
          </p>
          <ToleranceGroup defaultIndex={1} values={advanceBtnValue} />
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
                  name={route.name}
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

Advanced.propTypes = {

};

export default Advanced;
