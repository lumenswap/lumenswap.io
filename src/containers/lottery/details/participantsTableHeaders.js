import styles from '../style.module.scss';

const truncateText = (text) => (text.length > 10 ? `${text.slice(0, 6)}...${text.slice(-6)}` : text);

export default [
  {
    title: 'Address',
    dataIndex: 'address',
    key: '1',
    render: (data) => (
      <div className={styles.ticketId}>
        {truncateText('123456789101112131415161718')}
      </div>
    ),
  },
  {
    title: 'Number of tickets',
    dataIndex: 'numTickets',
    key: '2',
    render: (data) => (
      <div>
        300
      </div>
    ),
  },
];
