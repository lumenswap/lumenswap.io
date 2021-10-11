import Button from 'components/Button';
import BN from 'helpers/BN';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import Image from 'next/image';
import Ticket from 'assets/images/ticket.svg';
import { useSelector } from 'react-redux';
import LSP from 'tokens/LSP';
import styles from './style.module.scss';

const BuyTicketSingle = () => {
  const userBalances = useSelector((state) => state.userBalance);
  const lspBalance = userBalances.find((i) => isSameAsset(getAssetDetails(LSP), i.asset));
  let buttonContent = 'Buy';
  let buttonDisabled = false;

  if (!lspBalance || new BN(1).gt(lspBalance.balance)) {
    buttonContent = 'Insufficient LSP';
    buttonDisabled = true;
  }

  function handleClick() {

  }

  return (
    <div className={styles['single-ticket-modal']}>
      <span className={styles['ticket-icon']}>
        <Image src={Ticket} width={36} height={36} />
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
