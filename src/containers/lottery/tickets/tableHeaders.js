import moment from 'moment';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import styles from '../style.module.scss';

export default [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketId',
    key: '1',
    render: (data) => (
      <a style={{ textDecoration: 'none' }} href={generateTransactionURL(data.transactionId)} target="_blank" rel="noreferrer" className={styles.ticketId}>
        {minimizeAddress(data.transactionId, 8)}
      </a>
    ),
  },
  {
    title: 'Round',
    dataIndex: 'round',
    key: '2',
    render: (data) => (
      <div>
        #{data.Round?.number}
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: '3',
    render: (data) => (
      <div>
        {moment(data.ticketDate).fromNow()}
      </div>
    ),
  },
];
