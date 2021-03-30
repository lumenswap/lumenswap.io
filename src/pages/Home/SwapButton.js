import Button from 'components/Button';
import { useSelector } from 'react-redux';

export default function SwapButton({ control }) {
  const isLogged = useSelector((state) => state.user.logged);

  let variant = 'secondary';
  let message = '';
  let disabled = true;
  if (!isLogged) {
    message = 'Connect Wallet';
    variant = 'secondary';
    disabled = false;
  }

  return (
    <Button
      htmlType="submit"
      variant={variant}
      content={message}
      fontSize={18}
      size="100%"
      className="mt-3"
      disabled={disabled}
    />
  );
}
