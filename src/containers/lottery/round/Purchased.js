import { useState, useEffect } from 'react';
import Loading from 'components/Loading';
import Ticket from 'assets/images/ticket.svg';
import generatePaymentTRX from 'stellar-trx/generatePaymentTRX';
import { useDispatch, useSelector } from 'react-redux';
import { getAssetDetails } from 'helpers/asset';
import LSP from 'tokens/LSP';
import signForThem from 'walletIntegeration/signForThem';
import { updateModalProps } from 'actions/modal';
import styles from './style.module.scss';

const Purchased = ({ numTickets }) => {
  const [loading, setLoading] = useState(true);
  const [purchasedTickets, setPurchasedTickets] = useState(0);
  const [error, setError] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const dispatch = useDispatch();

  useEffect(() => {
    async function purchase() {
      let purchasedCount = 0;
      while (purchasedCount < numTickets) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const trx = await generatePaymentTRX(
            userAddress,
            '1',
            getAssetDetails(LSP),
            process.env.REACT_APP_LOTTERY_ACCOUNT,
            null,
          );
          // eslint-disable-next-line no-await-in-loop
          await signForThem(trx, () => {});
        } catch (e) {
          setError(e.message);
          break;
        }

        purchasedCount = purchasedCount + 1;
        setPurchasedTickets(purchasedCount);
      }

      setLoading(false);
      dispatch(updateModalProps({ hasClose: true }));
    }

    purchase();
  }, []);

  let verb = 'ticket was';
  if (numTickets > 1) {
    verb = 'tickets were';
  }
  let messagePrefix = `${purchasedTickets}/${numTickets}`;
  if (!loading) {
    messagePrefix = numTickets;
  }
  const message = `${messagePrefix} ${verb} purchased`;

  if (error) {
    return (
      <div>
        <p>{message}</p>
        <p>
          but faced an issue, error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className={styles['purchased-modal']}>
      <span className={styles['ticket-icon']}>
        <img src={Ticket} width={36} height={36} />
      </span>
      <p className={styles.bold}>{message}</p>
      {loading && (
      <>
        <p>please wait, buying tickets may take some time</p>
        <Loading size={40} />
      </>
      )}
    </div>
  );
};

export default Purchased;
