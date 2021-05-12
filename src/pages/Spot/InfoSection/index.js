import { useState } from 'react';
import Checkbox from 'components/Checkbox';
import CustomTabs from 'components/CustomTabs';
import ButtonGroup from 'components/ButtonGroup';
import Table from 'components/Table';
import styles from '../styles.module.scss';

const tableHeader = ['Date', 'Pair', 'Side', 'Price', 'Amount', 'Total'];
const tableRows = () => [0, 1, 2].map((row, index) => (
  <tr key={index}>
    <td className="color-gray">
      <div className={styles['td-outside']}>
        04-23  13:43:21
      </div>
    </td>
    <td>USDC/XLM</td>
    <td className="color-sell">Sell</td>
    <td>0.50123</td>
    <td>$130</td>
    <td width="30%">20 USDT</td>
  </tr>
));

const buttonGroupItems = [
  { label: '1 Day', value: '1' },
  { label: '1 Week', value: '7' },
  { label: '1 Month', value: '30' },
  { label: '3 Month', value: '90' },
];

const filterTable = (
  <>
    <ButtonGroup
      buttons={buttonGroupItems}
      activeIndex={0}
      setValue={(v) => { console.log(v); }}
    />
    <div className={styles['container-table']}>
      <Table tableRows={tableRows()} tableHead={tableHeader} />
    </div>
  </>
);

const historyTab = [
  { title: 'Open orders', id: 'order', content: filterTable },
  { title: 'Trade History', id: 'trade', content: filterTable },
];

const InfoSection = () => {
  const [checked, setCheckbox] = useState(false);
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
        <CustomTabs tabs={historyTab} activeTabId={historyTab[0].id} fontSize={14} />
      </div>
    </>
  );
};

export default InfoSection;
