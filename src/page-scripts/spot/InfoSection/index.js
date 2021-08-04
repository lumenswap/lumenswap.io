import { useState } from 'react';
// import Checkbox from 'components/Checkbox';
// import CustomTabs from 'components/CustomTabs';
// import ButtonGroup from 'components/ButtonGroup';
// import { useSelector } from 'react-redux';
import CTabs from 'components/CTabs';
import TabContent from './TabContent';
// import OrderHistory from './OrderHistory';
// import TradeHistory from './TradeHistory';
// import styles from '../styles.module.scss';

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

export default function InfoSection() {
  const [orderCounter, setOrderCounter] = useState(0);
  const historyTab = [
    { title: `Open Orders(${orderCounter})`, id: 'order' },
    { title: 'Trade History', id: 'trade' },
  ];

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
      <div className="mt-md-0 mt-sm-4 mt-4 h-100">
        {/* <CustomTabs
          tabs={historyTab}
          activeTabId={historyTab[0].id}
          fontSize={14}
          tabContent={() => null}
          onChange={(val) => {
            setCurrentTab(val);
          }}
        />
        <TabContent /> */}
        <CTabs
          tabs={historyTab}
          tabContent={TabContent}
          setOrderCounter={setOrderCounter}
          customTabs={{ example: 1 }}
        />
      </div>
    </>
  );
}
