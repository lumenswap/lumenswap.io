import { useForm } from 'react-hook-form';
import Image from 'next/image';

import AMMCurrentPrice from 'components/AMMCurrentPrice';
import LiquidityInput from 'components/LiquidityInput';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import btcLogo from 'assets/images/btc-logo.png';
import Button from 'components/Button';

import styles from './styles.module.scss';

const IncreaseLiquidity = (props) => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.warn(data);
  };

  const currentCurrency = {
    pair1: { value: '14', currency: 'ETH' },
    pair2: { value: '1', currency: 'BTC' },
  };

  return (
    <div className="pb-4">
      <h6 className={styles.label}>Inpool</h6>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={btcLogo} width={20} height={20} /></div>
          <div>BTC</div>
        </div>
        <div>12</div>
      </div>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={usdLogo} width={20} height={20} /></div>
          <div>USD</div>
        </div>
        <div>5</div>
      </div>

      <div className={styles.current}><AMMCurrentPrice pairs={currentCurrency} /></div>

      <hr className={styles.hr} />

      <h6 className={styles.label}>Increase liquidity</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LiquidityInput
          balance="12 LSP"
          value={15}
          currency="USD"
          currencySrc={usdLogo}
          innerRef={register}
          name="one"
        />
        <LiquidityInput
          balance="12 LSP"
          value={6}
          currency="BTC"
          currencySrc={btcLogo}
          className="mt-3"
          innerRef={register}
          name="two"
        />
        <Button
          htmlType="submit"
          variant="primary"
          content="Increase liquidity"
          fontWeight={500}
          className={styles.btn}
        />
      </form>
    </div>
  );
};

export default IncreaseLiquidity;
