import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import ObmHeader from 'components/ObmHeader';
import ArrowRight from 'assets/images/arrowRight';
import btcLogo from 'assets/images/btc-logo.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import CurrencyPair from 'components/CurrencyPair';
import Button from 'components/Button';
import ModalDialog from 'components/ModalDialog';
import IncreaseLiquidity from 'blocks/IncreaseLiquidity';

import styles from './styles.module.scss';

const LiquidityChart = dynamic(() => import('../../../components/LiquidityChart'), {
  ssr: false,
});

const index = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const tokens = router.query.token;

  const grid1 = 'col-xl-7 col-lg-6 col-md-6 col-sm-12 col-12';
  const grid2 = 'col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column';

  return (
    <div className="container-fluid pb-5">
      <Head>
        <title>{tokens && `${tokens[0]}/${tokens[1]}`} | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-11 col-md-12 col-sm-12 col-12">
            <div className="row align-items-center">
              <div className={grid1}>
                <h1 className={styles.label}>
                  Pool
                  <div className="mx-2">
                    <ArrowRight />
                  </div>
                  <CurrencyPair size={26} source={[btcLogo, usdLogo]} />
                  <div className="ml-2">{tokens && `${tokens[0]}/${tokens[1]}`}</div>
                </h1>
              </div>
              <div className={grid2}>
                <div className="d-flex justify-content-between mt-lg-0 mt-md-4 mt-sm-4 mt-4">
                  <Button
                    variant="primary"
                    content="Increase Liquidity"
                    className={styles['btn-primary']}
                    onClick={() => setShowModal(true)}
                  />
                  <Button
                    variant="basic"
                    content="Remove Liquidity"
                    className={styles['btn-basic']}
                  />
                  {showModal && (
                  <ModalDialog
                    show={showModal}
                    setShow={setShowModal}
                    title="Increase Liquidity"
                    className="main"
                  >
                    <IncreaseLiquidity />
                  </ModalDialog>
                  ) }
                </div>
              </div>
            </div>
            <div className="row">
              <div className={grid1}>
                <div className={classNames(styles.card, styles['card-chart'])}><LiquidityChart /></div>
              </div>
              <div className={grid2}>
                <div className={classNames(styles.card, styles['card-liquidity'])}>
                  <div className={styles['card-section']}>
                    <div className={styles['card-title']}>Liquidity</div>
                    <div className={styles['card-value']}>$500</div>
                  </div>
                  <div className={styles['card-pairs']}>
                    <div className={styles.pair}>10 USDC</div>
                    <div className={styles.pair}>100 XLM</div>
                  </div>
                </div>
                <div className={classNames(styles.card, styles['card-fee'])}>
                  <div className={styles['card-section']}>
                    <div className={styles['card-title']}>Unclaimed fee’s</div>
                    <div className={styles['card-value']}>$10</div>
                  </div>
                  <div className={styles['card-pairs']}>
                    <div className={styles.pair}>1 USDC</div>
                    <div className={styles.pair}>2.33 XLM</div>
                  </div>
                  <div className={styles['card-btn']}>
                    <Button
                      variant="secondary"
                      content="Claim fee’s"
                      className={styles['btn-secondary']}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
