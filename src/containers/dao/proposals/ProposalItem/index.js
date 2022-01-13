import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'next/image';

import sampleLogo from 'assets/images/btc-logo.png';
import Badge from 'components/Badge';

import styles from './styles.module.scss';

const ProposalItem = (props) => (
  <div className={styles.item}>
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <div className={styles.img}>
          <Image
            src={sampleLogo}
            width={24}
            height={24}
            alt="sample"
          />
        </div>
        <div className={styles.text}>By 0x7384…6trs47</div>
      </div>
      <div>
        <Badge variant="success" content="Active" />
      </div>
    </div>
    <h4 className={styles.title}>Will Joe Biden win the 2020 United States
      presidential election?
    </h4>
    <p className={classNames(styles.text, 'mt-2 mb-0')}>Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua Egestas purus viverra accumsan in nisl nisi
    </p>

    <div className={classNames(styles.text, 'mt-4')}>
      End in 2 days
    </div>
  </div>
);

ProposalItem.propTypes = {

};

export default ProposalItem;
