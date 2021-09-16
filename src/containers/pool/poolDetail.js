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

import styles from './postDetail.module.scss';

const LiquidityChart = dynamic(() => import('../../components/LiquidityChart'), {
  ssr: false,
});

const poolDetail = () => {
  const router = useRouter();
  const tokens = router.query.token;

  return (
    <div className="container-fluid">
      <Head>
        <title>{tokens && `${tokens[0]}/${tokens[1]}`} | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-11 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12 col-12">
                <h1 className={styles.label}>
                  Pool
                  <div className="mx-2">
                    <ArrowRight />
                  </div>
                  <CurrencyPair size={26} source={[btcLogo, usdLogo]} />
                  <div className="ml-2">{tokens && `${tokens[0]}/${tokens[1]}`}</div>
                </h1>
                <div className={classNames(styles.card, styles['card-chart'])}><LiquidityChart /></div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    content="Increase Liquidity"
                    className={styles['btn-primary']}
                  />
                  <Button
                    variant="basic"
                    content="Remove Liquidity"
                    className={styles['btn-basic']}
                  />
                </div>
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

export default poolDetail;
