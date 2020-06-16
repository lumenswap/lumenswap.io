import React from 'react';
import BaseLayout from 'src/shared/components/Layout/BaseLayout';
import { activeOrderTHeader, completeOrderTHeader } from 'src/constants/valus';
import Table from 'src/shared/components/Table';
import TableInfo from 'src/shared/components/TableInfo';
import styles from './styles.less';

const Order = () => {
  const activeTableRows = [];
  const completeTableRows = [];
  [0, 1, 2, 3, 4, 5].map((item) => {
    activeTableRows.push(
      <tr>
        <td>0x401b914336…078ff425697f8</td>
        <td>1 BTC - amir.com</td>
        <td>14 ETH - apay.com</td>
        <td width="18%" className="td-light">2 min ago</td>
        <td width="8%"><button type="button" className={styles.cancel}>Cancel</button></td>
      </tr>,
    );
  });

  [0, 1, 2, 3, 4, 5].map((item) => {
    completeTableRows.push(
      <tr>
        <td>1 BTC - amir.com</td>
        <td>14 ETH - apay.com</td>
        <td className="td-light">2 min ago</td>
      </tr>,
    );
  });

  return (
    <BaseLayout>
      <div className="pb-5 mb-2">
        <TableInfo title="Active orders" link="/" style={{ marginTop: '42px' }} className="mb-2" />
        <Table tableRows={activeTableRows} tableHead={activeOrderTHeader} />
        <TableInfo title="Complete orders" link="/" style={{ marginTop: '42px' }} className="mb-2" />
        <Table tableRows={completeTableRows} tableHead={completeOrderTHeader} />
      </div>
    </BaseLayout>
  );
};

export default Order;
