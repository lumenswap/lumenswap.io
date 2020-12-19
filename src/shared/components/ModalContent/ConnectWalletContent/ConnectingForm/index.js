import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { ReactComponent as AlbedoSvg } from 'src/assets/logins/albedo.svg';
import { ReactComponent as FreighterSvg } from 'src/assets/logins/freighter.svg';
import { ReactComponent as LedgerSvg } from 'src/assets/logins/ledger.svg';
import albedo from '@albedo-link/intent';
import loginAsAlbedo from 'src/actions/user/loginAsAlbedo';
import hideModal from 'src/actions/modal/hide';
import fetchUserBalance from 'src/api/fetchUserBalance';
import setToken from 'src/actions/setToken';
import Str from '@ledgerhq/hw-app-str';
import Transport from '@ledgerhq/hw-transport-u2f';
import loginAsLedgerS from 'src/actions/user/loginAsLedgerS';
import TrezorConnect from 'trezor-connect';
import loginAsTrezor from 'src/actions/user/loginAsTrezor';
import {
  isConnected,
  getPublicKey as getPublicKeyFreighterApi,
} from '@stellar/freighter-api';
import loginAsFreighter from 'src/actions/user/loginAsFreighter';

function getPublicKeyFromAlbedo() {
  return albedo
    .publicKey()
    .then(async (res) => {
      const balances = await fetchUserBalance(res.pubkey);
      setToken(balances);
      return res;
    })
    .then((res) => loginAsAlbedo(res.pubkey))
    .then(hideModal);
}

async function getPublicKeyFromLedgerS() {
  const transport = await Transport.create();
  const str = new Str(transport);
  const result = await str.getPublicKey("44'/148'/0'");
  const balances = await fetchUserBalance(result.publicKey);
  setToken(balances);
  loginAsLedgerS(result.publicKey);
  hideModal();
}

async function getPublickKeyFromTrezor() {
  const payloadFromTrezor = await TrezorConnect.stellarGetAddress({
    path: "m/44'/148'/0'",
  });
  if (payloadFromTrezor.success) {
    const balances = await fetchUserBalance(payloadFromTrezor.payload.address);
    setToken(balances);
    loginAsTrezor(payloadFromTrezor.payload.address);
    hideModal();
  }
}

async function getPublickKeyFromFreighter() {
  if (isConnected()) {
    const publicKey = await getPublicKeyFreighterApi();
    const balances = await fetchUserBalance(publicKey);
    setToken(balances);
    loginAsFreighter(publicKey);
    hideModal();
  } else {
    throw new Error('You do not have Freighter');
  }
}

function chooseName(type) {
  if (type === 'ledger') {
    return 'Ledger';
  }

  if (type === 'trezor') {
    return 'Trezor';
  }

  if (type === 'albedo') {
    return 'Albedo';
  }

  if (type === 'freighter') {
    return 'Freighter';
  }

  return null;
}

function chooseLogo(type) {
  if (type === 'ledger') {
    return <LedgerSvg width={26} height={26} />;
  }

  if (type === 'albedo') {
    return <AlbedoSvg width={26} height={26} />;
  }

  if (type === 'freighter') {
    return <FreighterSvg width={26} height={26} />;
  }

  return null;
}

function chooseWalletDesc(type) {
  if (type === 'ledger') {
    return 'Hardware';
  }

  if (type === 'trezor') {
    return 'Hardware';
  }

  if (type === 'albedo') {
    return 'Browser Extension';
  }

  if (type === 'freighter') {
    return 'Browser Extension';
  }

  return null;
}

export default function ConnectingForm({ type }) {
  const [conError, setConError] = useState(null);

  function loginThroughThird() {
    setConError(null);

    if (type === 'ledger') {
      getPublicKeyFromLedgerS().catch((e) => {
        setConError(e.message);
      });
    }

    if (type === 'albedo') {
      getPublicKeyFromAlbedo().catch((e) => {
        setConError(e.message);
      });
    }

    if (type === 'freighter') {
      getPublickKeyFromFreighter().catch((e) => {
        setConError(e.message);
      });
    }
  }

  useEffect(() => {
    loginThroughThird();
  }, [type]); // eslint-disable-line

  function renderMessage() {
    if (conError) {
      return (
        <p style={{ margin: 0 }}>
          Error While Connecting.
          <span onClick={loginThroughThird} className={styles.tryBox}>
            Try Again
          </span>
        </p>
      );
    }

    return 'Connecting...';
  }

  return (
    <div>
      <div
        style={{ marginBottom: 20 }}
        className={classNames(styles.rectangle, conError && styles.errorBox)}
      >
        {!conError && (
          <span
            className={classNames(styles.loading)}
            style={{ width: 25, height: 25, display: 'inline-block' }}
          />
        )}
        <span>{renderMessage()}</span>
      </div>

      <div className={classNames(styles.rectangle, styles.ledgerMenu)}>
        <div>
          <p
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            {chooseName(type)}
          </p>
          <p className={styles.subText}>
            Easy-to-use {chooseWalletDesc(type)} wallet
          </p>
        </div>
        <div>{chooseLogo(type)}</div>
      </div>
    </div>
  );
}
