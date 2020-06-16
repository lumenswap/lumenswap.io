import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { arrowRightSvg } from 'Root/constants/valus';
import { connectModalTab } from 'Root/constants/enum';
import styles from './styles.less';

const buttonContent = (text) => (
  <>
    <span className={styles['icon-holder']}>
      <span className="icon-link center-ver-hor" />
    </span>
    <span>{text}</span>
    <span className={classNames('ml-auto', styles.svg)}>{arrowRightSvg}</span>
  </>
);

const ConnectWalletContent = ({ tab, setTab }) => {
  const toggleTab = (value) => {
    setTab(value);
  };
  return (
    <div className="mt-3">
      {(() => {
        switch (tab) {
          case connectModalTab.PUBLIC:
            return 'public';
          case connectModalTab.PRIVATE:
            return 'private';
          default:
            return (
              <>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => toggleTab(connectModalTab.PUBLIC)}
                >
                  {buttonContent('Public key')}
                </button>
                <button
                  type="button"
                  className={classNames(styles.btn, 'mt-4')}
                  style={{ marginBottom: '20px' }}
                  onClick={() => toggleTab(connectModalTab.PRIVATE)}
                >
                  {buttonContent('Private key')}
                </button>
              </>
            );
        }
      })()}
    </div>
  );
};

ConnectWalletContent.propTypes = {

};

export default ConnectWalletContent;
