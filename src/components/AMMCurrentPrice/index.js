import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const AMMCurrentPrice = ({ pairs }) => (
  <div className={styles.box}>
    <div className={styles['box-title']}>Current Price</div>
    <div className={styles['box-value']}>
      {pairs.pair1.value} {pairs.pair1.currency} per {pairs.pair2.value} {pairs.pair2.currency}
    </div>
  </div>
);

AMMCurrentPrice.propTypes = {
  pairs: PropTypes.object.isRequired,
};

export default AMMCurrentPrice;
