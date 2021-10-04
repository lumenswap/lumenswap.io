import styles from '../style.module.scss';

const truncateText = (text) => (text.length > 10 ? `${text.slice(0, 6)}...${text.slice(-6)}` : text);

export default [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketId',
    key: '1',
    render: (data) => (
      <div className={styles.ticketId}>
        {truncateText('123456789101112131415161718')}
      </div>
    ),
  },
  {
    title: 'Round',
    dataIndex: 'round',
    key: '2',
    render: (data) => (
      <div>
        #1
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: '3',
    render: (data) => (
      <div>
        1 month ago
      </div>
    ),
  },
];
