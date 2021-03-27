import { useState } from 'react';
import classNames from 'classnames';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Button from 'components/Button';
import ModalDialog from 'components/ModalDialog';
import ConfirmSwap from 'blocks/ConfirmSwap';
import Header from 'components/Header';
import LCurrencyInput from 'components/LCurrencyInput';
import XLM from 'tokens/XLM';
import LPriceSpreadSection from 'components/LPriceSpreadSection';
import USDC from 'tokens/USDC';
import calculateSendEstimatedAndPath from 'helpers/calculateSendEstimatedAndPath';
import calculateReceiveEstimatedAndPath from 'helpers/calculateReceiveEstimatedAndPath';
import getAssetDetails from 'helpers/getAssetDetails';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

const Home = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [paths, setPaths] = useState([]);

  const {
    handleSubmit, control, setValue, getValues,
  } = useForm({
    defaultValues: {
      from: { asset: XLM, amount: null },
      to: { asset: USDC, amount: null },
      priceSpread: '0.1',
    },
  });
  const formValues = useWatch({ control });

  const onSubmit = (data) => {
    console.log(data);
  };

  function swapFromWithTo() {
    const innerFormValues = getValues();
    setValue('from', { asset: innerFormValues.to.asset, amount: innerFormValues.from.amount });
    setValue('to', { asset: innerFormValues.from.asset, amount: innerFormValues.to.amount });
  }

  function changeFromInput(amount) {
    if (amount && !(new BN(amount).isEqualTo(0))) {
      setLoading(true);
      calculateSendEstimatedAndPath(
        amount,
        getAssetDetails(formValues.from.asset),
        getAssetDetails(formValues.to.asset),
      ).then((res) => {
        setEstimatedPrice(res.minAmount);
        setPaths(res.path);
        setValue('to', {
          ...formValues.to,
          amount: res.minAmount,
        });
      }).finally(() => {
        setLoading(false);
      });
    }

    if (amount === null) {
      setValue('to', {
        ...formValues.to,
        amount: '',
      });
    }
  }

  function changeToInput(amount) {
    if (amount && !(new BN(amount).isEqualTo(0))) {
      setLoading(true);
      calculateReceiveEstimatedAndPath(
        amount,
        getAssetDetails(formValues.from.asset),
        getAssetDetails(formValues.to.asset),
      ).then((res) => {
        setEstimatedPrice(amount);
        setPaths(res.path.reverse());
        setValue('from', {
          ...formValues.from,
          amount: res.minAmount,
        });
      }).finally(() => {
        setLoading(false);
      });
    }

    if (amount === null) {
      setValue('from', {
        ...formValues.from,
        amount: '',
      });
    }
  }

  const isConnected = true;

  return (
    <div className="container-fluid">
      <Header />
      <div className="row justify-content-center">
        <div className="col-auto">
          <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
              <Controller
                name="from"
                control={control}
                render={(props) => (
                  <LCurrencyInput
                    {...props}
                    showMax
                    label="From"
                    onChangeInput={changeFromInput}
                  />
                )}
              />
              <div className="my-2 text-center">
                <span className={classNames('icon-arrow-down', styles['icon-arrow-down'])} onClick={swapFromWithTo} />
              </div>
              <Controller
                name="to"
                control={control}
                render={(props) => (
                  <LCurrencyInput
                    {...props}
                    label="To (estimated)"
                    onChangeInput={changeToInput}
                  />
                )}
              />
              <p className={styles.info}>
                1 {formValues.to.asset.code} = 12 {formValues.from.asset.code}
                <span className="icon-arrow-repeat" />
              </p>
              <Button
                htmlType="submit"
                variant={isConnected ? 'primary' : 'secondary'}
                content="Swap"
                fontSize={18}
                size="100%"
                className="mt-3"
              />
              <ModalDialog show={show} setShow={setShow} title="Confirm Swap">
                <ConfirmSwap />
              </ModalDialog>
            </div>
            <div className={styles['swap-info']}>
              <Controller
                name="priceSpread"
                control={control}
                render={(props) => (
                  <LPriceSpreadSection
                    {...props}
                    control={control}
                    estimatedPrice={estimatedPrice}
                    paths={paths}
                    upperLoading={loading}
                  />
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
