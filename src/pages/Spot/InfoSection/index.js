import { useEffect, useRef, useState } from 'react';
// import Checkbox from 'components/Checkbox';
import CustomTabs from 'components/CustomTabs';
// import ButtonGroup from 'components/ButtonGroup';
import Table from 'components/Table';
import { useSelector } from 'react-redux';
import { fetchOffersOfAccount, fetchTradesOfAccount } from 'api/stellar';
import moment from 'moment';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import StellarSDK from 'stellar-sdk';
import generateManageSellTRX from 'stellar-trx/generateManageSellTRX';
import store from 'store';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import styles from '../styles.module.scss';

const tableTradeRows = (rows) => rows.map((row, index) => (
  <tr key={index}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        {row.time}
      </div>
    </td>
    <td>{row.pair}</td>
    <td className={`color-${row.isSell ? 'sell' : 'buy'}`}>{row.isSell ? 'Sell' : 'Buy'}</td>
    <td>{row.price} {row.counterAsset}</td>
    <td>{row.amount} {row.baseAsset}</td>
    <td width="30%">{row.total} {row.counterAsset}</td>
  </tr>
));

const tableOrderRows = (rows) => rows.map((row, index) => (
  <tr key={index}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        {row.time}
      </div>
    </td>
    <td>{row.pair}</td>
    {/* <td className={`color-${row.isSell
    ? 'sell' : 'buy'}`}>{row.isSell ? 'Sell' : 'Buy'}</td> */}
    <td>{row.price} {row.counterAsset.getCode()}</td>
    <td>{row.amount} {row.baseAsset.getCode()}</td>
    <td>{row.total} {row.counterAsset.getCode()}</td>
    <td>
      <span
        onClick={async () => {
          function func() {
            const address = store.getState().user.detail.address;
            return generateManageSellTRX(
              address,
              row.counterAsset,
              row.baseAsset,
              '0',
              row.price,
              row.id,
            );
          }

          showGenerateTrx(func)
            .then(showSignResponse)
            .catch(console.error);
        }}
        style={{ cursor: 'pointer' }}
      >
        Cancel
      </span>
    </td>
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

const FilterTable = ({ isLogged, rows, isOrder }) => {
  if (!isLogged) {
    return 'Connect your wallet';
  }

  const tradeHeader = ['Date', 'Pair', 'Side', 'Price', 'Amount', 'Total'];
  const orderHeader = ['Date', 'Pair', 'Price', 'Amount', 'Total', 'Action'];

  return (
    <div className={styles['container-table']}>
      <Table
        tableRows={isOrder ? tableOrderRows(rows) : tableTradeRows(rows)}
        tableHead={isOrder ? orderHeader : tradeHeader}
      />
    </div>
  );
};

const InfoSection = () => {
  // const [checked, setCheckbox] = useState(false);
  const historyTab = [
    { title: 'Open orders', id: 'order' },
    { title: 'Trade History', id: 'trade' },
  ];
  const user = useSelector((state) => state.user);
  const [rowsData, setRowsData] = useState([]);
  const [currentTab, setCurrentTab] = useState('order');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (user.logged && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
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
              const total = new BN(item.price).times(item.amount);
              const counterAsset = item.buying.asset_code
                ? new StellarSDK.Asset(item.buying.asset_code, item.buying.asset_issuer)
                : new StellarSDK.Asset.native();
              const baseAsset = item.selling.asset_code
                ? new StellarSDK.Asset(item.selling.asset_code, item.selling.asset_issuer)
                : new StellarSDK.Asset.native();

              return {
                time: moment(time.valueOf()).utc().format('MM-DD  hh:mm:ss'),
                pair: `${item.selling.asset_code || 'XLM'}/${item.buying.asset_code || 'XLM'}`,
                isSell: true,
                price: sevenDigit(item.price),
                amount: sevenDigit(item.amount),
                counterAsset,
                baseAsset,
                total: sevenDigit(total.toString()),
                id: item.id,
              };
            }));
          });
        }
      }, 2000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [user.logged, currentTab]);

  return (
    <>
      {/* <div className={styles['container-checkbox']}>
        <Checkbox
          checked={checked}
          onChange={() => setCheckbox(!checked)}
          size={15}
          label="Hide other pairs"
        />
      </div> */}
      <div className="mt-md-0 mt-sm-4 mt-4">
        <CustomTabs
          tabs={historyTab}
          activeTabId={historyTab[0].id}
          fontSize={14}
          tabContent={() => <FilterTable isLogged={user.logged} rows={rowsData} isOrder={currentTab === 'order'} />}
          onChange={setCurrentTab}
        />
      </div>
    </>
  );
};

export default InfoSection;
