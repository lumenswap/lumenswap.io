import Button from 'components/Button';
import CurrencyInput from 'components/CurrencyInput';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

export default function LCurrencyInput({
  value, onChange, showMax = false, label, onChangeInput,
}) {
  function setCurrency(asset) {
    onChange({ ...value, asset });
  }

  return (
    <CurrencyInput
      label={label}
      balance="0.0277818"
      currentCurrency={value.asset}
      setCurrency={setCurrency}
    >
      <input
        placeholder="0.0"
        value={value.amount}
        onChange={(e) => {
          const number = new BN(e.target.value);
          if (!number.isNaN()) {
            onChange({ ...value, amount: e.target.value });
            onChangeInput(e.target.value);
          } else if (e.target.value === '') {
            onChange({ ...value, amount: null });
            onChangeInput(null);
          }
        }}
      />
      {showMax && <Button variant="secondary" content="Max" className={styles.max} />}
    </CurrencyInput>
  );
}
