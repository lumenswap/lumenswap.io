import { useRouter } from 'next/router';
import Button from 'components/Button';
import CurrencyInput from 'components/CurrencyInput';
import BN from 'helpers/BN';
import isSameAsset from 'helpers/isSameAsset';
import { useSelector } from 'react-redux';
import getAssetDetails from 'helpers/getAssetDetails';
import styles from './styles.module.scss';

export default function LCurrencyInput({
  value,
  onChange,
  showMax = false,
  label,
  onChangeInput,
  originChange,
  getFormValues,
  swapFromWithTo,
  changeToAsset,
}) {
  const isLogged = useSelector((state) => state.user.logged);
  const userBalance = useSelector((state) => state.userBalance);
  const userCustomTokens = useSelector((state) => state.userCustomTokens);

  const router = useRouter();

  function setCurrency(asset) {
    onChange({ ...value, asset });
    originChange(getFormValues().from.amount);

    const from = getFormValues().from.asset.details.code;
    const to = getFormValues().to.asset?.details?.code;

    const isFromCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), getFormValues().from.asset?.details));

    const isToCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), getFormValues().to.asset?.details));

    if (isFromCustomToken || isToCustomToken) router.push('/swap/custom');
    else {
      router.push(`/swap/${from}-${to}`);
    }
  }

  function setMaxBalance() {
    const found = userBalance.find((i) => isSameAsset(i.asset, value.asset.details));

    if (found) {
      onChange({ ...value, amount: found.balance });
      onChangeInput(found.balance);
    }
  }

  function onInputChange(e) {
    e.preventDefault();

    const number = new BN(e.target.value);
    if (!number.isNaN()) {
      onChange({ ...value, amount: e.target.value });
      onChangeInput(e.target.value);
    } else if (e.target.value === '') {
      onChange({ ...value, amount: null });
      onChangeInput(null);
    }
  }

  return (
    <CurrencyInput
      label={label}
      currentCurrency={value.asset}
      setCurrency={setCurrency}
      getFormValues={getFormValues}
      swapFromWithTo={swapFromWithTo}
      changeToAsset={changeToAsset}
    >
      <input
        placeholder="0.0"
        value={value.amount || ''}
        onChange={onInputChange}
      />
      {showMax && isLogged && (
        <Button
          variant="secondary"
          content="MAX"
          fontWeight={500}
          className={styles.max}
          onClick={setMaxBalance}
        />
      )}
    </CurrencyInput>
  );
}
