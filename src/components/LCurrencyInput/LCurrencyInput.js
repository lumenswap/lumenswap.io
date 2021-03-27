import Button from 'components/Button';
import CurrencyInput from 'components/CurrencyInput';
import btc from 'assets/images/btc-logo.png';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

export default function LCurrencyInput({
  value, onChange, showMax = false,
}) {
  const innerValue = value || { asset: {}, amount: null };

  return (
    <CurrencyInput
      label="From"
      balance="0.0277818"
      currentCurrency={{ name: 'BTC', img: btc }}
    >
      <input
        placeholder="0.0"
        value={innerValue.amount}
        onChange={(e) => {
          const number = new BN(e.target.value);
          if (!number.isNaN()) {
            onChange({ ...innerValue, amount: e.target.value });
          }
        }}
      />
      {showMax && <Button variant="secondary" content="Max" className={styles.max} />}
    </CurrencyInput>
  );
}
