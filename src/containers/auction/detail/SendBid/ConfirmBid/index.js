import React from 'react';

import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import generateManageBuyTRX from 'stellar-trx/generateManageBuyTRX';
import { getAssetDetails } from 'helpers/asset';
import XLM from 'tokens/XLM';
import BN from 'helpers/BN';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const ConfirmBid = ({ data, tokenA, reloadData }) => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.user.detail.address);
  const handleSubmit = () => {
    function func() {
      return generateManageBuyTRX(
        userAddress,
        getAssetDetails(tokenA),
        getAssetDetails(XLM),
        new BN(data.tokenAmount).toFixed(7),
        new BN(data.price).toFixed(7),
        0,
      );
    }

    showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch))
      .catch(console.log)
      .then(reloadData);
  };

  return (
    <div>
      <div className={styles.text}>
        You will buy {' '}
        <span>
          {humanAmount(data.tokenAmount)}
        </span> {tokenA.code} for {' '}
        <span>
          {humanAmount(new BN(data.price).times(data.tokenAmount).toFixed(7))}
        </span> XLM
      </div>
      <Button
        onClick={handleSubmit}
        variant="primary"
        content="Confirm"
        className={styles.btn}
      />
    </div>
  );
};

export default ConfirmBid;
