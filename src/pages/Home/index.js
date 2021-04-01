import { useState } from 'react';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
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
import { openConnectModal, openModalAction } from 'actions/modal';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import ExchangeRate from './ExchangeRate';
import SwapButton from './SwapButton';

const Home = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [paths, setPaths] = useState([]);
  const isLogged = useSelector((state) => state.user.logged);

  const {
    handleSubmit, control, setValue, getValues,
  } = useForm({
    defaultValues: {
      from: {
        asset: {
          details: getAssetDetails(XLM),
          logo: XLM.logo,
          web: XLM.web,
        },
        amount: null,
      },
      to: {
        asset: {
          details: getAssetDetails(USDC),
          logo: USDC.logo,
          web: USDC.web,
        },
        amount: null,
      },
      priceSpread: '0.1',
    },
  });

  const onSubmit = (data) => {
    if (!isLogged) {
      openConnectModal();
    } else {
      openModalAction({
        modalProps: {
          title: 'Confirm Swap',
        },
        content: <ConfirmSwap data={{ ...data, estimatedPrice, paths }} />,
      });
    }
  };

  function changeFromInput(amount) {
    const formValues = getValues();
    if (amount && !(new BN(amount).isEqualTo(0))) {
      setLoading(true);
      calculateSendEstimatedAndPath(
        amount,
        formValues.from.asset.details,
        formValues.to.asset.details,
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
    const formValues = getValues();
    if (amount && !(new BN(amount).isEqualTo(0))) {
      setLoading(true);
      calculateReceiveEstimatedAndPath(
        amount,
        formValues.from.asset.details,
        formValues.to.asset.details,
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

  function swapFromWithTo() {
    const formValues = getValues();
    setValue('from', { asset: formValues.to.asset, amount: formValues.to.amount });
    setValue('to', { asset: formValues.from.asset, amount: '' });
    changeFromInput(formValues.to.amount);
  }

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
                    originChange={changeFromInput}
                    getFormValues={getValues}
                    swapFromWithTo={swapFromWithTo}
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
                    originChange={changeFromInput}
                    getFormValues={getValues}
                    swapFromWithTo={swapFromWithTo}
                  />
                )}
              />
              <ExchangeRate control={control} estimatedPrice={estimatedPrice} loading={loading} />
              <SwapButton control={control} />
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
