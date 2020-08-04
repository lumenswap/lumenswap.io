import React, { useEffect, useState } from 'react';
import { activeOrderTHeader, completeOrderTHeader } from 'src/constants/valus';
import Table from 'src/shared/components/Table';
import TableInfo from 'src/shared/components/TableInfo';
import fetchUserActiveOrders from 'src/api/fetchUserActiveOrders';
import fetchUserCompletedOrders from 'src/api/fetchUserCompletedOrders';
import { useSelector } from 'react-redux';
import history from 'src/history';
import age from 'src/helpers/age';
import deleteManageBuyOffer from 'src/api/deleteManageBuyOffer';
import styles from './styles.module.scss';

const Order = () => {
  const [activeTableRows, setActiveTableRows] = useState([]);
  const [completedTableRows, setCompletedTableRows] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.logged) {
      history.push('/');
    }
  }, [user.logged]);

  async function fetchData() {
    if (user.logged) {
      try {
        const activeOrders = await fetchUserActiveOrders(user.detail.publicKey);
        const completedOrders = await fetchUserCompletedOrders(user.detail.publicKey);
        setActiveTableRows(activeOrders._embedded.records);
        setCompletedTableRows(completedOrders._embedded.records);
      } catch (e) {
        setActiveTableRows([]);
        setCompletedTableRows([]);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const activeRows = activeTableRows.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.amount} {item.selling.asset_type === 'native' ? 'XLM' : item.selling.asset_code}</td>
      <td>{item.amount * item.price} {item.buying.asset_type === 'native' ? 'XLM' : item.buying.asset_code}</td>
      <td width="18%" className="td-light">{age(item.last_modified_time)} ago</td>
      <td width="8%">
        <button
          type="button"
          className={styles.cancel}
          onClick={() => {
            deleteManageBuyOffer(item).then(fetchData);
          }}
        >Cancel
        </button>
      </td>
    </tr>
  ));

  const completedRows = completedTableRows.map((item) => {
    let sellAmount = item.base_amount;
    let buyAmount = item.counter_amount;
    let sellCode = item.base_asset_type === 'native' ? 'XLM' : item.base_asset_code;
    let buyCode = item.counter_asset_type === 'native' ? 'XLM' : item.counter_asset_code;
    if (item.counter_account === user.detail.publicKey) {
      sellAmount = item.counter_amount;
      buyAmount = item.base_amount;
      buyCode = item.base_asset_type === 'native' ? 'XLM' : item.base_asset_code;
      sellCode = item.counter_asset_type === 'native' ? 'XLM' : item.counter_asset_code;
    }

    return (
      <tr key={item.id}>
        <td>{sellAmount} {sellCode}</td>
        <td>{buyAmount} {buyCode}</td>
        <td className="td-light">{age(item.ledger_close_time)} ago</td>
      </tr>
    );
  });

  return (
    <div className="pb-5 mb-2">
      <TableInfo
        title="Active orders"
        link={`https://lumenscan.io/offers?a=${user.detail.publicKey}`}
        style={{ marginTop: '42px' }}
        className="mb-2"
      />
      <Table tableRows={activeRows} tableHead={activeOrderTHeader} />
      <TableInfo
        title="Complete orders"
        link={`https://lumenscan.io/trades?a=${user.detail.publicKey}`}
        style={{ marginTop: '42px' }}
        className="mb-2"
      />
      <Table tableRows={completedRows} tableHead={completeOrderTHeader} />
    </div>
  );
};

export default Order;
