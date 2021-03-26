import { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import CurrencyInput from 'components/CurrencyInput';
import SwapInfo from 'blocks/SwapInfo';
import btc from 'assets/images/btc-logo.png';
import Button from 'components/Button';
import ModalDialog from 'components/ModalDialog';
import ConfirmSwap from 'blocks/ConfirmSwap';
import styles from './styles.module.scss';

const Home = () => {
  const [show, setShow] = useState(false);
  const swapData = {
    minimum: '2952 ETH',
    price: '2%',
    tolerance: ['0.1', '0.5'],
    path: ['btc', 'eth', 'xlm'],
  };
  const [tolerance, setTolerance] = useState(swapData.tolerance[0]);
  const {
    register, handleSubmit, setValue, errors,
  } = useForm();
  const onSubmit = (data) => {
    if (data.custom) {
      setTolerance(data.custom);
    }
  };

  const isConnected = true;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-auto">
          <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
              <CurrencyInput
                label="From"
                balance="0.0277818"
                currentCurrency={{ name: 'BTC', img: btc }}
              >
                <input type="number" name="from" ref={register} placeholder="0.0" />
                <Button variant="secondary" content="Max" className={styles.max} />
              </CurrencyInput>
              <div className="my-2 text-center">
                <span className={classNames('icon-arrow-down', styles['icon-arrow-down'])} />
              </div>
              <CurrencyInput
                label="To (estimated)"
                balance="12"
                currentCurrency={{ name: 'BTC', img: btc }}
              >
                <input type="number" name="to" ref={register} placeholder="0.0" />
              </CurrencyInput>
              <p className={styles.info}>1 BTC = 12 ETH<span className="icon-arrow-repeat" /></p>
              <Button
                htmlType="submit"
                variant={isConnected ? 'primary' : 'secondary'}
                content="Swap"
                fontSize={18}
                size="100%"
                className="mt-3"
                onClick={() => setShow(true)}
              />
              <ModalDialog show={show} setShow={setShow} title="Confirm Swap">
                <ConfirmSwap />
              </ModalDialog>
            </div>
            <div className={styles['swap-info']}>
              <SwapInfo info={swapData} setTolerance={setTolerance} setInput={setValue}>
                <input type="number" name="custom" placeholder="custom" ref={register} autoFocus={!tolerance} />
              </SwapInfo>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
