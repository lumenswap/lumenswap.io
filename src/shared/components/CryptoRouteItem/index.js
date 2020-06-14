import React from 'react';
import PropTypes from 'prop-types';
import angleRight from 'Root/assets/images/angle-right-light.png';
import styles from './styles.less';

const CryptoRouteItem = ({ logo, name, isLast }) => (
  <>
    <img src={logo} height="24px" width="24px" alt="" />
    <h6 className={styles.crypto}>{name}</h6>
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

CryptoRouteItem.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default CryptoRouteItem;
