import React from 'react';

import Button from 'components/Button';

import styles from './styles.module.scss';

const ConfirmBid = () => (
  <div>
    <div className={styles.text}>
      You will buy <span>12,000</span> RBT for <span>1,500</span> XLM
    </div>
    <Button
      htmlType="submit"
      variant="primary"
      content="Confirm"
      className={styles.btn}
    />
  </div>
);

export default ConfirmBid;
