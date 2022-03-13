import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeModalAction, openConnectModal, openModalAction } from 'actions/modal';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import Button from 'components/Button';
import Input from 'components/Input';
import questionLogo from 'assets/images/question.png';
import { useEffect, useState } from 'react';
import useIsLogged from 'hooks/useIsLogged';
import SelectAsset from './SelectAsset';
import ConvertConfirmModal from './ConfirmModal/ConvertConfirmModal';
import LTokensConvertCofirmModal from './ConfirmModal/LTokensConvertConfirmModal';

import styles from './styles.module.scss';

const AssetLabel = ({
  logo, name, onClick,
}) => (
  <Button
    variant="basic"
    size="100%"
    className={onClick ? styles['convert-btn'] : styles['convert-btn-disabled']}
    onClick={onClick ?? (() => {})}
  >
    <div className="d-flex align-items-center">
      <img src={logo} width={30} height={30} alt="assetLogo" />
      <div className={styles.currency}>{name}</div>
    </div>
    <div className="icon-angle-down color-base" />
  </Button>
);

const ConfirmModalContent = ({ convertInfo }) => {
  if (convertInfo.selectedTokens.tokenA.name.charAt(0) === 'L') {
    return (
      <LTokensConvertCofirmModal
        convertInfo={convertInfo}
      />
    );
  }

  return (
    <ConvertConfirmModal
      convertInfo={convertInfo}
    />
  );
};

const BridgeConvert = ({ bridgeTokens }) => {
  const [selectedTokens, setSelectedTokens] = useState({
    tokenA: bridgeTokens[0],
    tokenB: null,
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

  useEffect(() => {
    setSelectedTokens({
      ...selectedTokens,
      tokenB: bridgeTokens.find((token) => token.name === selectedTokens.tokenA.ported_asset),
    });
  }, []);

  const onSelectAsset = () => () => {
    const handleSelectAsset = (selectedToken) => () => {
      setSelectedTokens({
        tokenA: selectedToken,
        tokenB: bridgeTokens.find((token) => token.name === selectedToken.ported_asset),
      });
      dispatch(closeModalAction());
    };
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main',
        },
        content: <SelectAsset
          assets={bridgeTokens}
          onSelectAsset={handleSelectAsset}
        />,
      }),
    );
  };

  return (
    <BridgeContainer title="Bridge Convert | Lumenswap">
      <div className="layout main d-flex justify-content-center">
        <div className={styles.card}>
          <div className={styles.container}>
            <AssetLabel
              name={selectedTokens.tokenA?.name}
              logo={selectedTokens.tokenA?.logo ?? questionLogo}
              onClick={onSelectAsset()}
            />

            <div className={styles.icon}>
              <span className="icon-arrow-down color-primary" />
            </div>

            <AssetLabel
              name={selectedTokens.tokenB?.name}
              logo={selectedTokens.tokenB?.logo ?? questionLogo}
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
