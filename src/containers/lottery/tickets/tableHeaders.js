import moment from 'moment';
import styles from '../style.module.scss';

const truncateText = (text) => (text.length > 10 ? `${text.slice(0, 6)}...${text.slice(-6)}` : text);

export default [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketId',
    key: '1',
    render: (data) => (
      <div className={styles.ticketId}>
        {truncateText(data.transactionId)}
      </div>
    ),
  },
  {
    title: 'Round',
    dataIndex: 'round',
    key: '2',
    render: (data) => (
      <div>
        #{data.roundNumber}
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
