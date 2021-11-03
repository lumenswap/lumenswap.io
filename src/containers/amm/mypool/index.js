import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'components/AMMHeader';
import Button from 'components/Button';
import AddLiquidity from 'containers/amm/AddLiquidity';
import { openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import XLM from 'tokens/XLM';
import LSP from 'tokens/LSP';
import getAssetDetails from 'helpers/getAssetDetails';
import MyPoolData from './myPoolData';
import styles from './styles.module.scss';

function MyPoolPage() {
  const isLogged = useSelector((state) => state.user.logged);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelectAsset = (newSelectTokens) => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'New pool',
          className: 'main',
        },
        content: <AddLiquidity
          selectAsset={handleSelectAsset}
          {...newSelectTokens}
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
        content: <AddLiquidity
          tokenA={getAssetDetails(XLM)}
          tokenB={getAssetDetails(LSP)}
          selectAsset={handleSelectAsset}
        />,
      }),
    );
  };

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.pool.root());
    }
  }, [isLogged]);

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
            <MyPoolData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPoolPage;
