import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';
import LoadingWithContainer from './LoadingWithContainer/LoadingWithContainer';

const tableHeaders = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: 1,
    render: (data) => (
      <span className={styles.address}>
        <a href={generateAddressURL(data.seller)} target="_blank" rel="noreferrer">{minimizeAddress(data.seller)}</a>
      </span>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 2,
    render: (data) => <span>{moment(data.last_modified_time).fromNow()}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 3,
    render: (data) => <span>{humanAmount(data.amount)} NLSP</span>,
  },
];

function OffersData({ offers }) {
  return (
    <div>
      <CTable
        columns={tableHeaders}
        noDataMessage="There is no offer"
        dataSource={offers}
        className={styles.table}
        loading={!offers}
        customLoading={LoadingWithContainer}
      />
    </div>
  );
}

export default OffersData;
