import numeral from 'numeral';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import styles from '../style.module.scss';

export default [
  {
    title: 'Address',
    dataIndex: 'address',
    key: '1',
    render: (data) => (
      <a style={{ textDecoration: 'none' }} href={generateAddressURL(data.address)} target="_blank" rel="noreferrer" className={styles.ticketId}>
        {minimizeAddress(data.address)}
      </a>
    ),
  },
  {
    title: 'Number of tickets',
    dataIndex: 'numTickets',
    key: '2',
    render: (data) => (
      <div>
        {numeral(data.ticketCount).format('0,0')}
      </div>
    ),
  },
];
