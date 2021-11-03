import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'components/AMMHeader';
import AddLiquidity from 'containers/amm/AddLiquidity';
import { openModalAction } from 'actions/modal';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import getAssetDetails from 'helpers/getAssetDetails';
import LSP from 'tokens/LSP';
import XLM from 'tokens/XLM';
import styles from './styles.module.scss';
import PoolData from './poolData';

const PoolPage = () => {
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

  return (
    <div className="container-fluid">
      <Head>
        <title>Pool | Lumenswap</title>
      </Head>
      <AMMHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12 px-xl-5 px-lg-3 px-md-3 px-sm-3 px-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.label}>Pools</h1>
              <Button
                variant="primary"
                content="New Pool"
                className={styles.btn}
                onClick={openModal}
              />
            </div>
            <PoolData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolPage;
