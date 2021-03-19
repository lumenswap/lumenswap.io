import classNames from 'classnames';
import CurrencyInput from 'components/CurrencyInput';
import btc from 'assets/images/btc-logo.png';
import Button from 'components/Button';
import SwapInfo from 'components/SwapInfo';
import styles from './styles.module.scss';

const Home = () => {
  const swapData = {
    minimum: '2952 ETH',
    price: '2%',
    tolerance: ['0.1%', '0.5%'],
    path: ['btc', 'eth', 'xlm'],
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-auto">
          <div className={styles.container}>
            <div className={styles.card}>
              <form action="">
                <CurrencyInput label="From" balance="0.0277818" currentCurrency={{ name: 'BTC', img: btc }} max />
                <div className="my-2 text-center">
                  <span className={classNames('icon-arrow-down', styles['icon-arrow-down'])} />
                </div>
                <CurrencyInput label="To (estimated)" balance="12" currentCurrency={{ name: 'BTC', img: btc }} />
                <p className={styles.info}>1 BTC = 12 ETH<span className="icon-arrow-repeat" /></p>
                <Button
                  htmlType="submit"
                  variant="primary"
                  content="Swap"
                  fontSize={18}
                  fontWeight="500"
                  size="100%"
                  className="mt-3"
                />
              </form>
            </div>
            <div className={styles['swap-info']}>
              <SwapInfo info={swapData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
