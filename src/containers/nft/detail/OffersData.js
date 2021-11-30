import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import BN from 'helpers/BN';
import moment from 'moment';
import humanAmount from 'helpers/humanAmount';
import { useState, useEffect } from 'react';
import { fetchOfferAPI } from 'api/stellar';
import getAssetDetails from 'helpers/getAssetDetails';
import { ONE_LUSI_AMOUNT } from 'appConsts';
import NLSP from 'tokens/NLSP';
import styles from './styles.module.scss';
import LoadingWithContainer from '../../../components/LoadingWithContainer/LoadingWithContainer';

const NoDataMessage = () => (
  <div className={styles['no-data-container']}>
    <span>There is no offer</span>
  </div>
);

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

function OffersData({ lusiData }) {
  const [offersData, setOffersData] = useState(null);

  useEffect(() => {
    fetchOfferAPI(
      getAssetDetails({ code: lusiData.assetCode, issuer: process.env.REACT_APP_LUSI_ISSUER }),
      getAssetDetails(NLSP),
      {
        limit: 10,
        order: 'desc',
      },
    ).then((res) => res
      .data
      ._embedded
      .records
      .filter((i) => new BN(i.price).isEqualTo(ONE_LUSI_AMOUNT)))
      .then((res) => setOffersData(res));
  }, []);

  return (
    <div>
      <CTable
        columns={tableHeaders}
        noDataMessage={NoDataMessage}
        dataSource={offersData}
        className={styles.table}
        loading={!offersData}
        customLoading={LoadingWithContainer}
      />
    </div>
  );
}

export default OffersData;
