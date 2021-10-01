import Head from 'next/head';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ObmHeader from 'components/ObmHeader';
import Button from 'components/Button';
import AddLiquidity from 'blocks/AddLiquidity';
import fetchPools from 'helpers/poolsAPI';
import { openModalAction } from 'actions/modal';
import Loading from 'components/Loading';
import { useEffect, useState } from 'react';
import PoolData from './poolData';

import styles from './styles.module.scss';

const PoolPage = () => {
  const dispatch = useDispatch();
  const [userPools, setUserPools] = useState(null);
  const userAdress = useSelector((state) => state.user.detail.address);

  const openModal = () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Add Liquidity',
          className: 'main',
        },
        content: <AddLiquidity />,
      }),
    );
  };

  useEffect(() => {
    fetchPools(userAdress).then((data) => {
      setUserPools(data.map((pool) => ({ ...pool, key: pool.token1.code })));
    });
  }, []);

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
              <h1 className={styles.label}>Pools</h1>
              <Button
                variant="primary"
                content="Add Liquidity"
                className={styles.btn}
                onClick={openModal}
              />
            </div>
            {!userPools
              ? (
                <div className={styles['loading-container']}>
                  <Loading size={48} />
                </div>
              )
              : <PoolData userPools={userPools} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolPage;
