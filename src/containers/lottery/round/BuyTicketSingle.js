import Button from 'components/Button';
import BN from 'helpers/BN';
import { getAssetDetails, isSameAsset } from 'helpers/asset';
import Ticket from 'assets/images/ticket.svg';
import generatePaymentTRX from 'stellar-trx/generatePaymentTRX';
import { useDispatch, useSelector } from 'react-redux';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import useDefaultTokens from 'hooks/useDefaultTokens';
import { extractTokenFromCode } from 'helpers/defaultTokenUtils';
import styles from './style.module.scss';

const BuyTicketSingle = () => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.user.detail.address);
  const userBalances = useSelector((state) => state.userBalance);
  const defaultTokens = useDefaultTokens();
  const lspBalance = userBalances.find((i) => isSameAsset(getAssetDetails(extractTokenFromCode('LSP', defaultTokens)), i.asset));
  let buttonContent = 'Confirm';
  let buttonDisabled = false;

  if (!lspBalance || new BN(1).gt(lspBalance.balance)) {
    buttonContent = 'Insufficient LSP';
    buttonDisabled = true;
  }

  function handleClick() {
    async function func() {
      return generatePaymentTRX(
        userAddress,
        '1',
        getAssetDetails(extractTokenFromCode('LSP', defaultTokens)),
        process.env.REACT_APP_LOTTERY_ACCOUNT,
        null,
      );
    }

    showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch))
      .catch(console.error);
  }

  return (
    <div className={styles['single-ticket-modal']}>
      <span className={styles['ticket-icon']}>
        <img src={Ticket} width={36} height={36} />
      </span>
      <p className={styles['text-normal']}>
        The cost of buying a ticket is <span className={styles['text-bold']}>1 LSP</span>
      </p>
      <Button
        htmlType="button"
        disabled={buttonDisabled}
        content={buttonContent}
        variant="primary"
        size="100%"
        onClick={handleClick}
      />
    </div>
  );
};

export default BuyTicketSingle;
