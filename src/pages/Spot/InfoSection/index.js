import { useEffect, useState } from 'react';
import Checkbox from 'components/Checkbox';
import CustomTabs from 'components/CustomTabs';
// import ButtonGroup from 'components/ButtonGroup';
import Table from 'components/Table';
import { useSelector } from 'react-redux';
import { fetchOffersOfAccount, fetchTradesOfAccount } from 'api/stellar';
import moment from 'moment';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import styles from '../styles.module.scss';

const tableHeader = ['Date', 'Pair', 'Side', 'Price', 'Amount', 'Total'];
const tableTradeRows = (rows) => rows.map((row, index) => (
  <tr key={index}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        {row.time}
      </div>
    </td>
    <td>{row.pair}</td>
    <td className={`color-${row.isSell ? 'sell' : 'buy'}`}>{row.isSell ? 'Sell' : 'Buy'}</td>
    <td>{row.price}</td>
    <td>{row.amount} {row.baseAsset}</td>
    <td width="30%">{row.total} {row.counterAsset}</td>
  </tr>
));

// const buttonGroupItems = [
//   { label: '1 Day', value: '1' },
//   { label: '1 Week', value: '7' },
//   { label: '1 Month', value: '30' },
//   { label: '3 Month', value: '90' },
// ];
// <ButtonGroup
//       buttons={buttonGroupItems}
//       activeIndex={0}
//       setValue={(v) => { console.log(v); }}
//     />

const FilterTable = ({ isLogged, rows }) => {
  if (!isLogged) {
    return 'Connect your wallet';
  }

  return (
    <div className={styles['container-table']}>
      <Table tableRows={tableTradeRows(rows)} tableHead={tableHeader} />
    </div>
  );
};

const InfoSection = () => {
  const [checked, setCheckbox] = useState(false);
  const historyTab = [
    { title: 'Open orders', id: 'order' },
    { title: 'Trade History', id: 'trade' },
  ];
  const user = useSelector((state) => state.user);
  const [rowsData, setRowsData] = useState([]);
  const [currentTab, setCurrentTab] = useState('order');

  useEffect(() => {
    if (user.logged) {
      if (currentTab === 'trade') {
        fetchTradesOfAccount(user.detail.address, { limit: 200 }).then((res) => {
          setRowsData(res.data._embedded.records.map((item) => {
            const time = new Date(item.ledger_close_time);
            const isSell = (item.base_account === user.detail.address && item.base_is_seller)
            || (item.counter_account === user.detail.address && !item.base_is_seller);
            const price = new BN(item.price.n).div(item.price.d);

            return {
              time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
              pair: `${item.base_asset_code || 'XLM'}/${item.counter_asset_code || 'XLM'}`,
              isSell,
              price: sevenDigit(price.toFixed(7)),
              amount: sevenDigit(item.base_amount),
              counterAsset: item.counter_asset_code || 'XLM',
              baseAsset: item.base_asset_code || 'XLM',
              total: sevenDigit(item.counter_amount),
            };
          }));
        });
      } else if (currentTab === 'order') {
        fetchOffersOfAccount(user.detail.address, { limit: 200 }).then((res) => {
          setRowsData(res.data._embedded.records.map((item) => {
            const time = new Date(item.last_modified_time);
            // const isSell = (item.base_account === user.detail.address && item.base_is_seller)
            // || (item.counter_account === user.detail.address && !item.base_is_seller);
            // const price = new BN(item.price.n).div(item.price.d);

            return {
              time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
              pair: `${item.selling.asset_code || 'XLM'}/${item.buying.asset_code || 'XLM'}`,
              isSell: true,
              // price: sevenDigit(price.toFixed(7)),
              // amount: sevenDigit(item.base_amount),
              // counterAsset: item.counter_asset_code || 'XLM',
              // baseAsset: item.base_asset_code || 'XLM',
              // total: sevenDigit(item.counter_amount),
            };
          }));
        });
      }
    }
  }, [user.logged, currentTab]);

  return (
    <>
      <div className={styles['container-checkbox']}>
        <Checkbox
          checked={checked}
          onChange={() => setCheckbox(!checked)}
          size={15}
          label="Hide other pairs"
        />
      </div>
      <div className="mt-md-0 mt-sm-4 mt-4">
        <CustomTabs
          tabs={historyTab}
          activeTabId={historyTab[0].id}
          fontSize={14}
          tabContent={() => <FilterTable isLogged={user.logged} rows={rowsData} />}
          onChange={setCurrentTab}
        />
      </div>
    </>
  );
};

export default InfoSection;
