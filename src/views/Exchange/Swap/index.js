import React from 'react';
import PropTypes from 'prop-types';
import arrowDown from 'Root/assets/images/arrow-down.png';
import arrowRepeat from 'Root/assets/images/arrow-repeat.png';
import styles from './styles.less';

const Swap = (props) => (
  <div className={styles.content}>
    <form>
      <div className="form-group">
        <label className="primary-label" htmlFor="from">From</label>
        <input type="text" className="form-control primary-input" id="from" />
      </div>
      <div className="row">
        <div className="col-12">
          <img
            src={arrowDown}
            height="24px"
            width="24px"
            className="d-block mx-auto"
            alt="arrow"
          />
        </div>
      </div>
      <div className="form-group" style={{ marginTop: '-8px' }}>
        <label className="primary-label" htmlFor="to">To (estimated)</label>
        <input type="text" className="form-control primary-input" id="to" />
        <p className={styles.info}>1 BTC = 12 ETH
          <img
            src={arrowRepeat}
            width="18px"
            height="18px"
            alt="arrow"
            className="ml-1"
          />
        </p>
      </div>
      <button type="button" className={styles.btn}>Connect Wallet</button>
    </form>
  </div>
);

Swap.propTypes = {

};

export default Swap;
