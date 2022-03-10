import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeModalAction, openConnectModal, openModalAction } from 'actions/modal';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import Button from 'components/Button';
import Input from 'components/Input';
import questionLogo from 'assets/images/question.png';
import { useState } from 'react';
import useIsLogged from 'hooks/useIsLogged';
import SelectAsset from './SelectAsset';
import ConvertConfirmModal from './ConfirmModal/ConvertConfirmModal';
import LTokensConvertCofirmModal from './ConfirmModal/LTokensConvertConfirmModal';

import styles from './styles.module.scss';

const AssetLabel = ({ logo, code, onClick }) => (
  <Button
    variant="basic"
    size="100%"
    className={styles['convert-btn']}
    onClick={onClick}
  >
    <div className="d-flex align-items-center">
      <img src={logo} width={30} height={30} alt="assetLogo" />
      <div className={styles.currency}>{code}</div>
    </div>
    <div className="icon-angle-down color-base" />
  </Button>
);

const ConfirmModalContent = ({ convertInfo }) => {
  if (convertInfo.selectedTokens.tokenA.type === 'l-asset') {
    return (
      <LTokensConvertCofirmModal
        convertInfo={convertInfo}
      />
    );
  }
  if (convertInfo.selectedTokens.tokenA.type === 'default') {
    return (
      <ConvertConfirmModal
        convertInfo={convertInfo}
      />
    );
  }
  return null;
};

const BridgeConvert = ({ defaultSelectedTokens }) => {
  const [selectedTokens, setSelectedTokens] = useState({
    tokenA: defaultSelectedTokens.tokenA,
    tokenB: defaultSelectedTokens.tokenB,
  });
  const isLoggedIn = useIsLogged();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    if (isLoggedIn) {
      dispatch(
        openModalAction({
          modalProps: {
            className: 'main p-0',
            hasClose: false,
          },
          content: <ConfirmModalContent convertInfo={{
            ...data,
            selectedTokens,
          }}
          />,
        }),
      );
    } else {
      dispatch(openConnectModal());
    }
  };

  const onSelectAsset = (token) => () => {
    const handleSelectAsset = (selectedToken) => () => {
      if (token === 'tokenA') {
        if (selectedToken.code === selectedTokens.tokenB.code) {
          setSelectedTokens((prev) => ({
            tokenB: prev.tokenA,
            tokenA: selectedToken,
          }));
        } else {
          setSelectedTokens({ ...selectedTokens, tokenA: selectedToken });
        }
      }
      if (token === 'tokenB') {
        if (selectedToken.code === selectedTokens.tokenA.code) {
          setSelectedTokens((prev) => ({
            tokenA: prev.tokenB,
            tokenB: selectedToken,
          }));
        } else {
          setSelectedTokens({ ...selectedTokens, tokenB: selectedToken });
        }
      }
      dispatch(closeModalAction());
    };
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main',
        },
        content: <SelectAsset onSelectAsset={handleSelectAsset} />,
      }),
    );
  };

  return (
    <BridgeContainer title="Bridge Convert | Lumenswap">
      <div className="layout main d-flex justify-content-center">
        <div className={styles.card}>
          <div className={styles.container}>
            <AssetLabel
              code={selectedTokens.tokenA.code}
              logo={selectedTokens.tokenA.logo ?? questionLogo}
              onClick={onSelectAsset('tokenA')}
            />

            <div className={styles.icon}>
              <span className="icon-arrow-down color-primary" />
            </div>

            <AssetLabel
              code={selectedTokens.tokenB.code}
              logo={selectedTokens.tokenB.logo ?? questionLogo}
              onClick={onSelectAsset('tokenB')}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label-primary mt-3">Amount</label>
            <Controller
              name="amount"
              control={control}
              render={(props) => (
                <Input
                  type="number"
                  placeholder="1"
                  value={props.value}
                  onChange={props.onChange}
                />
              )}
            />

            <label className="label-primary mt-3">Destination</label>
            <Controller
              name="destination"
              control={control}
              render={(props) => (
                <Input
                  type="text"
                  placeholder="G …"
                  value={props.value}
                  onChange={props.onChange}
                />
              )}
            />

            <Button
              variant="primary"
              htmlType="submit"
              size="100%"
              fontWeight={500}
              className="mt-4"
            >
              Convert
            </Button>
          </form>
        </div>
      </div>
    </BridgeContainer>
  );
};

export default BridgeConvert;
