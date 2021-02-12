import React, { useState } from 'react';
import classNames from 'classnames';
import { arrowRightSvg } from 'src/constants/valus';
import { connectModalTab } from 'src/constants/enum';
import PublicKeyForm from './PublicKeyForm';
import PrivateKeyForm from './PrivateKeyForm';
import styles from './styles.module.scss';
import { ReactComponent as PrivateSvg } from 'src/assets/logins/private.svg';
import { ReactComponent as AlbedoSvg } from 'src/assets/logins/albedo.svg';
import { ReactComponent as FreighterSvg } from 'src/assets/logins/freighter.svg';
import { ReactComponent as LedgerSvg } from 'src/assets/logins/ledger.svg';
import ConnectingForm from './ConnectingForm';
import showConnectModal from 'src/actions/modal/connectModal';
import { ReactComponent as DanglingLeft } from 'src/assets/images/danglingLeft.svg';

const buttonContent = (text, LoginIcon) => (
  <>
    <span className={styles['icon-holder']}>
      <LoginIcon width={18} height={18} />
    </span>
    <span>{text}</span>
    <span className={classNames('ml-auto', styles.svg)}>{arrowRightSvg}</span>
  </>
);

const ConnectWalletContent = () => {
  const [tab, setTab] = useState(null);

  const toggleTab = (value) => {
    showConnectModal(
      <DanglingLeft
        width={28}
        height={18}
        style={{ cursor: 'pointer ' }}
        onClick={() => {
          showConnectModal('Connect Wallet');
          setTab(null);
        }}
      />
    );
    setTab(value);
  };

  return (
    <div>
      {(() => {
        switch (tab) {
          case connectModalTab.PUBLIC:
            return <PublicKeyForm />;
          case connectModalTab.PRIVATE:
            return <PrivateKeyForm />;
          case connectModalTab.CONNECTING_LEDGER:
            return <ConnectingForm type="ledger" />;
          case connectModalTab.CONNECTING_FREIGHTER:
            return <ConnectingForm type="freighter" />;
          case connectModalTab.CONNECTING_ALBEDO:
            return <ConnectingForm type="albedo" />;
          case connectModalTab.CONNECTING_TREZOR:
            return <ConnectingForm type="trezor" />;
          default:
            return (
              <div className="mt-3 pt-1">
                <button
                  type="button"
                  className={classNames(styles.btn)}
                  style={{ marginBottom: '20px' }}
                  onClick={() => toggleTab(connectModalTab.PRIVATE)}
                >
                  {buttonContent('Private key', PrivateSvg)}
                </button>
                <button
                  type="button"
                  className={classNames(styles.btn, 'mt-4')}
                  onClick={() => toggleTab(connectModalTab.CONNECTING_LEDGER)}
                >
                  {buttonContent('Ledger', LedgerSvg)}
                </button>
                <button
                  type="button"
                  className={classNames(styles.btn, 'mt-4')}
                  onClick={() =>
                    toggleTab(connectModalTab.CONNECTING_FREIGHTER)
                  }
                >
                  {buttonContent('Freighter', FreighterSvg)}
                </button>
                <button
                  type="button"
                  className={classNames(styles.btn, 'mt-4')}
                  onClick={() => toggleTab(connectModalTab.CONNECTING_ALBEDO)}
                >
                  {buttonContent('Albedo Link', AlbedoSvg)}
                </button>
                {/* <button
                  type="button"
                  className={classNames(styles.btn, 'mt-4')}
                  onClick={() => toggleTab(connectModalTab.CONNECTING_TREZOR)}
                >
                  {buttonContent('Trezor', () => null)}
                </button> */}
              </div>
            );
        }
      })()}
    </div>
  );
};

// const ConnectWalletContent = () => <PrivateKeyForm />;

export default ConnectWalletContent;
