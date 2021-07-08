import { useState } from 'react';
import classNames from 'classnames';

import Header from 'components/Header';
import Button from 'components/Button';
import LineChart from 'components/LineChart';
import ModalDialog from 'components/ModalDialog';
import SendBid from 'blocks/SendBid';
import BidsSection from './BidsSection';
import styles from './styles.module.scss';

const info = [
  {
    title: 'Latest bid price', number: '0.001', token: 'XLM', value: '$0.012',
  },
  {
    title: 'Total amount of bids', number: '1,000,000', token: 'LSP', value: '2000 XLM',
  },
  { title: 'Total number of bids', number: '1,000,000' },
];

const Auction = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="container-fluid pb-5">
      <Header />
      <div className="layout-inside mt-4 main">
        <h1 className={styles.title}>LSP Auction stats</h1>
        <div className="row d-flex align-items-start justify-content-between">
          <div className="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12">
            <p className={styles.desc}>An online learning portal that will take you from a complete
              beginner to an expert in blockchain knowledge and cryptocurrency. With a focus on
              Stellar blockchain, you will learn everything there is to know.
            </p>
          </div>
          <div className="col-xl-4 col-lg-3 col-md-2 col-sm-12 col-12">
            <Button
              variant="primary"
              content="Send Bid"
              className={classNames(styles.btn, 'ml-md-auto ml-sm-0 ml-0 mt-md-0 mt-sm-4 mt-4')}
              onClick={() => setShow(true)}
            />
            <ModalDialog show={show} setShow={setShow} className="main" title="Send Bid">
              <SendBid />
            </ModalDialog>
          </div>
        </div>
        {/* info */}
        <div className={classNames(styles.card, styles['card-info'])}>
          <div className="row w-100">
            {info.map((item, index) => (
              <div className={classNames('col-lg-3 col-md-4 col-sm-12 col-12 px-0', styles['container-info'])} key={index}>
                <div className={styles.block}>
                  <div className={styles['title-info']}>{item.title}</div>
                  <div className={styles['number-info']}>{item.number} <span>{item.token}</span></div>
                  <div className={styles['value-info']}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* chart */}
        <div className={classNames(styles.card, styles['card-chart'])}>
          <LineChart />
        </div>
        {/* bids */}
        <div className={classNames(styles.card, styles['card-tabs'])}>
          <BidsSection />
        </div>
      </div>
    </div>
  );
};

export default Auction;
