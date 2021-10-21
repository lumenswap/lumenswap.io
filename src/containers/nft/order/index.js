import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import NFTHeader from 'components/NFTHeader';
import moment from 'moment';
import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import numeral from 'numeral';
import { useState, useEffect } from 'react';
import fetchNFTOrders from 'helpers/nftOrdersAPI';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['loading-data-container']}>
    <span>You have no orders</span>
  </div>
);

const handleCancelOrder = (id) => {
  console.log(`${id} deleted !`);
};

const tableHeaders = [
  {
    title: 'Info',
    dataIndex: 'info',
    key: 1,
    render: (data) => (
      <div className={styles['type-clmn']}>
        <span>{data.type} </span>
        <Link href={urlMaker.nft.lusi(data.id)}><a>Lusi#{data.id}</a></Link>
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 2,
    render: (data) => (
      <div>
        {moment(data.time).fromNow()}
      </div>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 3,
    render: (data) => (
      <div>
        {numeral(data.price).format('0,0')} LSP
      </div>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 4,
    render: (data) => <div className={styles['cancel-btn']} onClick={handleCancelOrder(data.id)}>Cancel</div>,
  },
];

const NFTOrder = () => {
  const [orders, setOrders] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);

  const isLogged = useSelector((state) => state.user.logged);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.nft.root());
    }
  }, []);

  useEffect(() => {
    fetchNFTOrders(userAddress).then((data) => setOrders(data));
  }, []);

  return (
    <div className="container-fluid">
      <Head>
        <title>NFT Order | Lumenswap</title>
      </Head>
      <NFTHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>My Orders</h1>
            <div className={styles['table-container']}>
              <CTable
                className={styles.table}
                columns={tableHeaders}
                dataSource={orders}
                noDataMessage={NoDataMessage}
                loading={!orders}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTOrder;
