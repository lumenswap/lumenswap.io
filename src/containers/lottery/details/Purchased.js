import Image from 'next/image';
import Loading from 'components/Loading';
import Ticket from 'assets/images/ticket.svg';
import styles from './style.module.scss';

const Purchased = ({ numTickets }) => {
  let message = '';

  if (numTickets > 1) {
    message = `${numTickets} tickets were purchased`;
  } else {
    message = `${numTickets} ticket was purchased`;
  }

  return (
    <div className={styles['purchased-modal']}>
      <span className={styles['ticket-icon']}>
        <Image src={Ticket} width={36} height={36} />
      </span>
      <p className={styles.bold}>{message}</p>
      <p>please wait, buying tickets may take some time</p>
      <Loading size={40} />
    </div>
  );
};

export default Purchased;
