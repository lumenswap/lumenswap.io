import { useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import ObmHeader from 'components/ObmHeader';
import Button from 'components/Button';
import Table from 'components/Table';
import PairCurrency from 'components/PairCurrency';
import ModalDialog from 'components/ModalDialog';
import btcLogo from 'assets/images/btc-logo.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import AddLiquidity from 'blocks/AddLiquidity';

import styles from './styles.module.scss';

const tableHeader = ['Pool', 'Amount'];

const tableRows = () => [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
  <tr key={row}>
    <td width="50%">
      <div className="d-flex">
        <PairCurrency size={22} source={[btcLogo, usdLogo]} />
        <span className={styles.pair}>XLM/USDC</span>
      </div>
    </td>
    <td>1000 USDC/ 200 XLM</td>
  </tr>
));

const PoolPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container-fluid">
      <Head>
        <title>Pool | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12 px-xl-5 px-lg-3 px-md-3 px-sm-3 px-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className={styles.label}>Pools</div>
              <Button
                variant="primary"
                content="Add Liquidity"
                className={styles.btn}
                onClick={() => setShowModal(true)}
              />
              {showModal && (
                <ModalDialog
                  show={showModal}
                  setShow={setShowModal}
                  title="Add Liquidity"
                  className="main"
                >
                  <AddLiquidity />
                </ModalDialog>
              )}
            </div>
            <Table
              tableRows={tableRows()}
              tableHead={tableHeader}
              className={styles.table}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolPage;
