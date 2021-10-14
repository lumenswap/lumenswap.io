import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import styles from '../style.module.scss';

const truncateText = (text) => (text.length > 10 ? `${text.slice(0, 6)}...${text.slice(-6)}` : text);

export default [
  {
    title: 'Address',
    dataIndex: 'address',
    key: '1',
    render: (data) => (
      <a href={generateTransactionURL(data.address)} target="_blank" rel="noreferrer" className={styles.ticketId}>
        {truncateText(data.address)}
      </a>
    ),
  },
  {
    title: 'Number of tickets',
    dataIndex: 'numTickets',
    key: '2',
    render: (data) => (
      <div>
        {data.ticketCount}
      </div>
    ),
  },
];
