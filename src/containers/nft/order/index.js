import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';

import ObmHeader from 'components/ObmHeader';
import Table from 'components/Table';

import styles from './styles.module.scss';

const NFTOrder = () => {
  const tableHeader = ['Info', 'Date', 'Amount', 'Action'];
  const tableRow = (
    <tr>
      <td className={styles['td-gray']}>Buy <Link href="/nft/1"><a>Lusi#1</a></Link></td>
      <td>2 min ago</td>
      <td>2300 LSP</td>
      <td><div className={styles.cancel}>Cancel</div></td>
    </tr>
  );

  return (
    <div className="container-fluid">
      <Head>
        <title>NFT Order | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>My Orders</h1>
            <div className={styles.card}>
              <Table
                tableRows={Array(10).fill(tableRow)}
                tableHead={tableHeader}
                className={styles.table}
                verticalScrollHeight={450}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTOrder;
