import React from 'react';
import angleRight from 'src/assets/images/angle-right-light.png';
import styles from './styles.less';

const CryptoRouteItem = ({ logo, code, isLast }) => (
  <>
    <img src={logo} height="24px" width="24px" alt="" />
    <h6 className={styles.crypto}>{code}</h6>
    {!isLast
    && (
    <img
      src={angleRight}
      width="8px"
      height="12px"
      alt="icon"
      className="d-block ml-auto"
    />
    )}
  </>
);

export default CryptoRouteItem;
