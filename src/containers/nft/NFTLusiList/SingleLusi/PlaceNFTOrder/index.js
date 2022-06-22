import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getAssetDetails, getSingleToken, isSameAsset } from 'helpers/asset';
import { useSelector, useDispatch } from 'react-redux';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import BN from 'helpers/BN';
import { ONE_LUSI_AMOUNT } from 'appConsts';
import generateManageBuyTRX from 'stellar-trx/generateManageBuyTRX';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import numeral from 'numeral';
import useDefaultTokens from 'hooks/useDefaultTokens';
import styles from './styles.module.scss';

const PlaceNFTOrder = ({ lusiAssetCode, afterPlace }) => {
  const dispatch = useDispatch();
  const userNLSPBalance = useSelector((state) => state.userBalance)
    .find((balance) => isSameAsset(getAssetDetails(balance.asset), getAssetDetails(getSingleToken('NLSP'))));
  const userAddress = useSelector((state) => state.user.detail.address);
  const defaultTokens = useDefaultTokens();

  const {
    control, handleSubmit, formState, trigger, getValues,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    function func() {
      return generateManageBuyTRX(
        userAddress,
        getAssetDetails({
          code: lusiAssetCode,
          issuer: process.env.REACT_APP_LUSI_ISSUER,
        }),
        getAssetDetails(getSingleToken('NLSP', defaultTokens)),
        ONE_LUSI_AMOUNT,
        new BN(data.price).times(10 ** 7).toFixed(0),
        0,
      );
    }

    showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch))
      .catch(console.log)
      .then(afterPlace);
  };

  useEffect(() => {
    trigger();
  }, []);

  const validatePrice = (price) => {
    if (new BN(0).gt(price)) {
      return 'Price is not valid';
    }

    if (new BN(price).gt(userNLSPBalance?.balance)) {
      return 'Insufficient NSLP';
    }

    const lessThanNLSP = '0.0000001';
    if (new BN(price).lt(lessThanNLSP)) {
      return 'Price must be greater than 0';
    }

    const moreThanNLSP = 100;
    if (new BN(price).gt(moreThanNLSP)) {
      return `Price must be less than ${moreThanNLSP}`;
    }

    return true;
  };

  function generateError() {
    for (const error of Object.values(formState.errors)) {
      if (error) {
        return error.message;
      }
    }

    return 'Confirm';
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.info} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label-primary mb-2 mt-4">Price</label>
        <Controller
          name="price"
          control={control}
          defaultValue=""
          rules={{
            required: 'Price is required',
            validate: validatePrice,
          }}
          render={({ field }) => (
            <InputGroup
              variant="primary"
              placeholder="10"
              rightLabel="NLSP"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className={styles.info}>
          <span>{getValues('price')} NLSP = {numeral(new BN(getValues('price')).times(10 ** 7).toFixed(0)).format('0,0')} LSP</span>
        </div>
        <Button
          htmlType="submit"
          variant="primary"
          content={generateError()}
          className={styles.btn}
          disabled={!formState.isValid || formState.isValidating}
        />
      </form>
    </div>
  );
};

export default PlaceNFTOrder;
