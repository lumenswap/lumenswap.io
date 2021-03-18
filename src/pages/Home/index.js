import CurrencyInput from 'components/CurrencyInput';
import btc from 'assets/images/btc-logo.png';
import Button from 'components/Button';
import styles from './styles.module.scss';

const Home = () => (
  <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-auto">
        <div className={styles.container}>
          <div className={styles.card}>
            <form action="">
              <CurrencyInput label="From" balance="0.0277818" currentCurrency={{ name: 'Btc', img: btc }} max />
              <div className="my-3" />
              <CurrencyInput label="To (estimated)" balance="12" currentCurrency={{ name: 'Btc', img: btc }} />
              <p className={styles.info}>1 BTC = 12 ETH</p>
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
        </div>
      </div>
    </div>
  </div>
);

export default Home;
