import React from 'react';
import angleDown from 'src/assets/images/angle-down.svg';
import styles from './styles.less';

const TxnInput = ({
  children, logo, assetCode, web, onClick = () => {},
}) => (
  <div className={styles.input} onClick={onClick}>
    {children}
    <button type="button" className={styles['input-btn']}>
      <img className={styles.coin} src={logo} alt="logo" />
      <div className="d-flex flex-column text-left pl-1">
        <span className={styles.name}>{assetCode}</span>
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

export default TxnInput;
