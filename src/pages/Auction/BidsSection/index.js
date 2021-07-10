import { fetchOffersOfAccount } from 'api/stellar';
import CustomTabs from 'components/CustomTabs';
import Loading from 'components/Loading';
import Table from 'components/Table';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import minimizeAddress from 'helpers/minimizeAddress';
import sevenDigit from 'helpers/sevenDigit';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LSP from 'tokens/LSP';
import StellarSDK from 'stellar-sdk';

import BN from 'helpers/BN';
import styles from '../styles.module.scss';
import fetchOfferAuction from './offerAuction';

const BidsSection = () => {
  const tableHeader = ['Account', 'Date', 'Amount', 'Price', 'Total'];
  const tableRows = (rows) => rows.map((row) => {
    const time = new Date(row.time);
    return (
      <tr key={row.id}>
        <td width="22%">
          <a
            href={`https://lumenscan.io/account/${row.address}`}
            target="_blank"
            rel="noreferrer"
          >
            {minimizeAddress(row.address)}
          </a>
        </td>
        <td>{moment(time.getTime()).fromNow()}</td>
        <td>{numeral(sevenDigit(row.lspAmount.toFixed(7))).format('0,0.[0000000]')} LSP</td>
        <td>{numeral(sevenDigit(row.lspPrice.toFixed(7))).format('0,0.[0000000]')} XLM</td>
        <td>{numeral(sevenDigit(row.xlmAmount.toFixed(7))).format('0,0.[0000000]')} XLM</td>
      </tr>
    );
  });

  const [bids, setBids] = useState(null);
  const isLogged = useSelector((state) => state.user.logged);
  const user = useSelector((state) => state.user);
  const [tab, setTab] = useState('latest');

  useEffect(() => {
    async function load() {
      const res = await fetchOfferAuction();
      setBids(res);
    }

    load();
  }, []);

  if (!bids) {
    return (
      <div
        className="col-xl-11 col-lg-10 col-md-10 col-sm-9 col-12 pr-sm-0 pr-3"
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300,
        }}
      >
        <Loading size={100} />
      </div>
    );
  }

  let historyTab = [
    {
      title: 'Latest bids',
      id: 'latest',
      content: <Table
        className={styles.table}
        tableRows={tableRows(bids)}
        tableHead={tableHeader}
      />,
    },
  ];

  if (isLogged) {
    historyTab = [
      ...historyTab,
      {
        title: 'My bids',
        id: 'mine',
        content: <Table
          className={styles.table}
          tableRows={tableRows(bids)}
          tableHead={tableHeader}
        />,
      },
    ];
  }

  async function onTabChange(newTab) {
    setBids(null);
    if (newTab === 'mine') {
      setTab('mine');
      const res = await fetchOffersOfAccount(user.detail.address, { limit: 200 });
      const refined = res.data._embedded.records.filter(
        (i) => {
          if (i.selling.asset_type !== 'native') {
            return false;
          }

          const buyAsset = new StellarSDK.Asset(i.buying.asset_code, i.buying.asset_issuer);
          return isSameAsset(buyAsset, getAssetDetails(LSP));
        },
      ).map((i) => ({
        address: i.seller,
        xlmAmount: new BN(i.amount),
        lspAmount: new BN(i.amount).times(i.price),
        lspPrice: new BN(i.amount).dividedBy(new BN(i.amount).times(i.price)),
        time: i.last_modified_time,
        id: i.id,
      }));
      setBids(refined);
    } else {
      setTab('latest');
      const res = await fetchOfferAuction();
      setBids(res);
    }
  }

  return (
    <div>
      <CustomTabs
        tabs={historyTab}
        activeTabId={tab}
        fontSize={16}
        onChange={onTabChange}
      />
    </div>
  );
};

export default BidsSection;
