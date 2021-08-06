import { useState } from 'react';
import CTabs from 'components/CTabs';
import TabContent from './TabContent';

export default function InfoSection() {
  const [orderCounter, setOrderCounter] = useState(0);
  const historyTab = [
    { title: `Open Orders(${orderCounter})`, id: 'order' },
    { title: 'Trade History', id: 'trade' },
  ];

  return (
    <>
      <div className="mt-md-0 mt-sm-4 mt-4 h-100">
        <CTabs
          tabs={historyTab}
          tabContent={TabContent}
          customTabProps={{ setOrderCounter }}
        />
      </div>
    </>
  );
}
