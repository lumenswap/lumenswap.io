import CustomTabs from 'components/CustomTabs';
import Loading from 'components/Loading';
import Table from 'components/Table';
import sevenDigit from 'helpers/sevenDigit';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles.module.scss';
import fetchOfferAuction from './offerAuction';

const BidsSection = () => {
  const tableHeader = ['Account', 'Date', 'Amount', 'Price', 'Total'];
  const tableRows = (rows) => rows.map((row) => {
    const time = new Date(row.time);
    return (
      <tr key={row.id}>
        <td width="22%"><a href="/" target="_blank" rel="noreferrer">{row.address}</a></td>
        <td>{moment(time.getTime()).fromNow()}</td>
        <td>{numeral(sevenDigit(row.lspAmount.toFixed(7))).format('0,0.[0000000]')} LSP</td>
        <td>{numeral(sevenDigit(row.lspPrice.toFixed(7))).format('0,0.[0000000]')} XLM</td>
        <td>{numeral(sevenDigit(row.xlmAmount.toFixed(7))).format('0,0.[0000000]')} XLM</td>
      </tr>
    );
  });

  const [bids, setBids] = useState(null);
  const isLogged = useSelector((state) => state.user.logged);

  useEffect(() => {
    async function load() {
      const res = await fetchOfferAuction();
      console.log(res);
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

  const historyTab = [
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

  // if (isLogged) {
  //   historyTab = [
  //     ...historyTab,
  //     {
  //       title: 'My bids',
  //       id: 'mine',
  //       content: <Table
  //         className={styles.table}
  //         tableRows={tableRows(new Array(3).fill(0))}
  //         tableHead={tableHeader}
  //       />,
  //     },
  //   ];
  // }

  return (
    <div>
      <CustomTabs tabs={historyTab} activeTabId={historyTab[0].id} fontSize={16} />
    </div>
  );
};

export default BidsSection;
