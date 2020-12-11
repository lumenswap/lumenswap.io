import React, { useState } from 'react';
import classNames from 'classnames';
import { arrowRightSvg } from 'src/constants/valus';
import { connectModalTab } from 'src/constants/enum';
import PublicKeyForm from './PublicKeyForm';
import PrivateKeyForm from './PrivateKeyForm';
import styles from './styles.module.scss';
import albedo from '@albedo-link/intent';
import loginAsAlbedo from 'src/actions/user/loginAsAlbedo';
import hideModal from 'src/actions/modal/hide';
import fetchUserBalance from 'src/api/fetchUserBalance';
import setToken from 'src/actions/setToken';
import Str from '@ledgerhq/hw-app-str';
import Transport from '@ledgerhq/hw-transport-u2f';
import loginAsLedgerS from 'src/actions/user/loginAsLedgerS';

function getPublicKeyFromAlbedo() {
  albedo
    .publicKey()
    .then(async (res) => {
      const balances = await fetchUserBalance(res.pubkey);
      setToken(balances);
      return res;
    })
    .then((res) => loginAsAlbedo(res.pubkey))
    .catch(console.error)
    .finally(hideModal);
}

async function getPublicKeyFromLedgerS() {
  try {
    const transport = await Transport.create();
    const str = new Str(transport);
    const result = await str.getPublicKey("44'/148'/0'");
    const balances = await fetchUserBalance(result.publicKey);
    setToken(balances);
    loginAsLedgerS(result.publicKey);
    hideModal();
  } catch (e) {
    console.log('error', e);
  }
}

const buttonContent = (text) => (
  <>
    <span className={styles['icon-holder']}>
      <span className="icon-link center-ver-hor" />
    </span>
    <span>{text}</span>
    <span className={classNames('ml-auto', styles.svg)}>{arrowRightSvg}</span>
  </>
);

const ConnectWalletContent = () => {
  const [tab, setTab] = useState(null);

  const toggleTab = (value) => {
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
          default:
            return (
              <div className="mt-3 pt-1">
                <button
                  type="button"
                  className={styles.btn}
                  onClick={getPublicKeyFromAlbedo}
                >
                  {buttonContent('Albedo Link')}
                </button>
                <button
                  type="button"
                  className={classNames(styles.btn, 'mt-4')}
                  onClick={getPublicKeyFromLedgerS}
                >
                  {buttonContent('Ledger')}
                </button>
                <button
                  type="button"
                  className={classNames(styles.btn, 'mt-4')}
                  style={{ marginBottom: '20px' }}
                  onClick={() => toggleTab(connectModalTab.PRIVATE)}
                >
                  {buttonContent('Private key')}
                </button>
              </div>
            );
        }
      })()}
    </div>
  );
};

// const ConnectWalletContent = () => <PrivateKeyForm />;

export default ConnectWalletContent;
