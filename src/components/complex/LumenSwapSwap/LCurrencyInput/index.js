import { useRouter } from 'next/router';
import Button from 'components/Button';
import CurrencyInput from 'components/complex/LumenSwapSwap/CurrencyInput';
import BN from 'helpers/BN';
import {
  isSameAsset, getAssetDetails, calculateMaxXLM, getSingleToken,
} from 'helpers/asset';
import { useSelector } from 'react-redux';
import useDefaultTokens from 'hooks/useDefaultTokens';
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
  type,
}) {
  const isLogged = useSelector((state) => state.user.logged);
  const userBalance = useSelector((state) => state.userBalance);
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const userSubentry = useSelector((state) => state.user.detail.subentry);
  const defaultTokens = useDefaultTokens();

  const router = useRouter();

  function setCurrency(asset) {
    onChange({ ...value, asset });
    originChange(getFormValues().from.amount);
    const fromAssetDetails = getAssetDetails(getFormValues().from.asset.details);
    let toAssetDetails = null;
    if (getFormValues().to?.asset?.details) {
      toAssetDetails = getAssetDetails(getFormValues().to.asset.details);
    }

    const isFromCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), fromAssetDetails));

    let isToCustomToken;
    if (getFormValues().to.asset) {
      isToCustomToken = userCustomTokens
        .find((token) => isSameAsset(getAssetDetails(token), toAssetDetails));
    }

    if (isFromCustomToken && !isToCustomToken) {
      const toAsset = { ...toAssetDetails };
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
      const fromAsset = { ...fromAssetDetails };
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
          isToCustomToken.issuer === 'native' ? null : isToCustomToken.issuer,
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
    const found = userBalance.find((i) => isSameAsset(i.asset,
      getAssetDetails(value.asset.details)));

    if (found) {
      let amount = found.balance;
      if (isSameAsset(getAssetDetails(found.asset), getAssetDetails(getSingleToken('XLM', defaultTokens)))) {
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
      type={type}
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
