import { useRouter } from 'next/router';
import Button from 'components/Button';
import CurrencyInput from 'components/complex/LumenSwapSwap/CurrencyInput';
import BN from 'helpers/BN';
import isSameAsset from 'helpers/isSameAsset';
import { useSelector } from 'react-redux';
import getAssetDetails from 'helpers/getAssetDetails';
import XLM from 'tokens/XLM';
import { calculateMaxXLM } from 'helpers/XLMValidator';
import styles from './styles.module.scss';

export default function LCurrencyInput({
  baseURL,
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
  const userSubentry = useSelector((state) => state.user.detail.subentry);

  const router = useRouter();

  function setCurrency(asset) {
    onChange({ ...value, asset });
    originChange(getFormValues().from.amount);

    const isFromCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), getFormValues().from.asset?.details));

    let isToCustomToken;
    if (getFormValues().to.asset) {
      isToCustomToken = userCustomTokens
        .find((token) => isSameAsset(getAssetDetails(token), getFormValues().to.asset?.details));
    }

    if (isFromCustomToken && !isToCustomToken) {
      const toAsset = { ...getFormValues().to.asset.details };
      toAsset.isDefault = true;
      router.push(
        baseURL.custom(
          isFromCustomToken.code,
          isFromCustomToken.issuer === 'native'
            ? null
            : isFromCustomToken.issuer,
          toAsset.code,
          toAsset.issuer === 'native' ? null : toAsset.issuer,
        ),
      );
    } else if (isToCustomToken && !isFromCustomToken) {
      const fromAsset = { ...getFormValues().from.asset.details };
      fromAsset.isDefault = true;
      router.push(
        baseURL.custom(
          fromAsset.code,
          fromAsset.issuer === 'native' ? null : fromAsset.issuer,
          isToCustomToken.code,
          isToCustomToken.issuer === 'native' ? null : isToCustomToken.issuer,
        ),
      );
    } else if (isFromCustomToken && isToCustomToken) {
      router.push(
        baseURL.custom(
          isFromCustomToken.code,
          isFromCustomToken.issuer === 'native'
            ? null
            : isFromCustomToken.issuer,
          isToCustomToken.code,
          isToCustomToken.issuer === 'native' ? null : isFromCustomToken.issuer,
        ),
      );
    } else {
      router.push(
        baseURL.custom(
          getFormValues().from.asset.details.code,
          null,
          getFormValues().to.asset?.details.code,
          null,
        ),
      );
    }
  }

  function setMaxBalance() {
    const found = userBalance.find((i) => isSameAsset(i.asset, value.asset.details));

    if (found) {
      let amount = found.balance;
      if (isSameAsset(getAssetDetails(found.asset), getAssetDetails(XLM))) {
        amount = calculateMaxXLM(found.balance, userSubentry);
      }

      onChange({ ...value, amount });
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
