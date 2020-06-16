import React from 'react';
import PropTypes from 'prop-types';
import angleDown from 'src/assets/images/angle-down.svg';
import styles from './styles.less';

const TxnInput = ({
  children, logo, name, web,
}) => (
  <div className={styles.input}>
    {children}
    <button type="button" className={styles['input-btn']}>
      <img className={styles.coin} src={logo} alt="logo" />
      <div className="d-flex flex-column text-left pl-1">
        <span className={styles.name}>{name}</span>
        <span className={styles.web}>{web}</span>
      </div>
      <img
        src={angleDown}
        width="8px"
        height="5px"
        alt="icon"
        className="d-block ml-auto"
      />
    </button>
  </div>
);

TxnInput.propTypes = {
  name: PropTypes.string.isRequired,
  web: PropTypes.string.isRequired,
};

export default TxnInput;
