import Button from 'components/Button';
import CurrencyInput from 'components/CurrencyInput';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

export default function LCurrencyInput({
  value, onChange, showMax = false, label, initAsset,
}) {
  const innerValue = value || { asset: initAsset, amount: null };

  function setCurrency(asset) {
    onChange({ ...innerValue, asset });
  }

  return (
    <CurrencyInput
      label={label}
      balance="0.0277818"
      currentCurrency={innerValue.asset}
      setCurrency={setCurrency}
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
