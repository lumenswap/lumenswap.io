import styles from '../style.module.scss';

export default [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketId',
    key: '1',
    render: (data) => (
      <div className={styles.ticketId}>
        test
      </div>
    ),
  },
  {
    title: 'Round',
    dataIndex: 'round',
    key: '2',
    render: (data) => (
      <div className={styles.tableText}>
        #1
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: '3',
    render: (data) => (
      <div className={styles.tableText}>
        1 month ago
      </div>
    ),
  },
];
