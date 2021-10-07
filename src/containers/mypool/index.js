import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'components/AMMHeader';
import Button from 'components/Button';
import AddLiquidity from 'blocks/AddLiquidity';
import { openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import fetchMyPools from 'helpers/myPoolsAPI';
import Loading from 'components/Loading';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import MyPoolData from './myPoolData';
import styles from './styles.module.scss';

function MyPoolPage() {
  const [userPools, setUserPools] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const isLogged = useSelector((state) => state.user.logged);
  const router = useRouter();
  const dispatch = useDispatch();

  let tokens = {
    tokenA: null,
    tokenB: null,
  };
  const handleSelectAsset = (selectedToken, tokenData) => {
    if (selectedToken === 'tokenA') {
      tokens = { ...tokens, tokenA: tokenData };
    } else {
      tokens = { ...tokens, tokenB: tokenData };
    }
    dispatch(
      openModalAction({
        modalProps: {
          title: 'New pool',
          className: 'main',
        },
        content: <AddLiquidity
          selectAsset={handleSelectAsset}
          tokenA={tokens.tokenA}
          tokenB={tokens.tokenB}
        />,
      }),
    );
  };

  const openModal = () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'New pool',
          className: 'main',
        },
        content: <AddLiquidity selectAsset={handleSelectAsset} />,
      }),
    );
  };

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.pool.root());
    }
    fetchMyPools(userAddress).then((poolData) => {
      setUserPools(poolData.map((pool, index) => ({
        ...pool,
        key: index,
      })));
    });
  }, []);
  if (!isLogged) {
    return <></>;
  }
  return (
    <div className="container-fluid">
      <Head>
        <title>My Pool | Lumenswap</title>
      </Head>
      <AMMHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12 px-xl-5 px-lg-3 px-md-3 px-sm-3 px-3">
            <div className={styles['header-table']}>
              <h1 className={styles.title}>My pools</h1>
              <Button
                variant="primary"
                content="New Pool"
                className={styles.btn}
                onClick={openModal}
              />
            </div>
            {userPools ? <MyPoolData userPools={userPools} />
              : <div className={styles['loading-container']}><Loading size={48} /></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPoolPage;
