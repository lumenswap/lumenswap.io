import React from 'react';

import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';
import styles from './styles.module.scss';

const ConfirmBid = ({ data, tokenA }) => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.user.detail.address);
  const handleSubmit = () => {
    // function func() {
    //   return generateManageBuyTRX(
    //     userAddress,
    //     getAssetDetails(tokenA),
    //     getAssetDetails(XLM),
    //     new BN(data.tokenAmount).toFixed(7),
    //     new BN(data.price).toFixed(7),
    //     0,
    //   );
    // }

    // showGenerateTrx(func, dispatch)
    //   .then((trx) => showSignResponse(trx, dispatch))
    //   .catch(console.log);
    dispatch(closeModalAction());
  };
  return (
    <div>
      <div className={styles.text}>
        You will buy <span>{numeral(data.tokenAmount).format('0,0')}</span> {tokenA.code} for <span>{numeral(data.price).format('0,0')}</span> XLM
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
