import Button from 'components/Button';
import BN from 'helpers/BN';
import isSameAsset from 'helpers/isSameAsset';
import { useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function SwapButton({ control }) {
  const isLogged = useSelector((state) => state.user.logged);
  const formValues = useWatch({ control });
  const userBalance = useSelector((state) => state.userBalance);
  const foundBalance = userBalance
    .find((item) => isSameAsset(item.asset, formValues.from.asset.details));
  const currentBalance = foundBalance ? foundBalance.balance : '0';

  let variant = 'secondary';
  let message = '';
  let disabled = true;
  if (!isLogged) {
    message = 'Connect Wallet';
    variant = 'secondary';
    disabled = false;
  } else if (new BN(formValues.from.amount).isGreaterThan(new BN(currentBalance))) {
    message = 'Insufficient Balance';
    variant = 'secondary';
    disabled = true;
  } else if (new BN(formValues.from.amount).isEqualTo('0') || new BN(formValues.from.amount).isNaN()) {
    message = 'Enter Amount';
    variant = 'secondary';
    disabled = true;
  } else {
    message = 'Swap';
    variant = 'primary';
    disabled = false;
  }

  return (
    <Button
      htmlType="submit"
      variant={variant}
      content={message}
      fontSize={18}
      fontWeight={600}
      size="100%"
      className="mt-3"
      disabled={disabled}
    />
  );
}
