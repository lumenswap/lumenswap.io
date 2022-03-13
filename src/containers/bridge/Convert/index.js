import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeModalAction, openConnectModal, openModalAction } from 'actions/modal';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import Button from 'components/Button';
import Input from 'components/Input';
import questionLogo from 'assets/images/question.png';
import useIsLogged from 'hooks/useIsLogged';
import NumberOnlyInput from 'components/NumberOnlyInput';
import SelectAsset from './SelectAsset';
import ConvertAssetLabel from './ConvertAssetLabel';
import ConvertConfirmModalContent from './ConvertConfirmModalContent';
import styles from './styles.module.scss';

const TOKEN_A_FORM_NAME = 'tokenA';
const TOKEN_B_FORM_NAME = 'tokenB';

const BridgeConvert = ({ bridgeTokens }) => {
  const isLoggedIn = useIsLogged();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tokenA: bridgeTokens[0],
      tokenB: bridgeTokens.find((token) => token.name === bridgeTokens[0].ported_asset),
      amount: null,
      destination: null,
    },
  });
  const handleReverseTokens = () => () => {
    const currentSelectedTokens = getValues([TOKEN_A_FORM_NAME, TOKEN_B_FORM_NAME]);
    setValue(TOKEN_A_FORM_NAME, currentSelectedTokens.tokenB);
    setValue(TOKEN_B_FORM_NAME, currentSelectedTokens.tokenA);
  };

  const onSubmit = (data) => {
    if (isLoggedIn) {
      dispatch(
        openModalAction({
          modalProps: {
            className: 'main p-0',
            hasClose: false,
          },
          content: <ConvertConfirmModalContent convertInfo={{
            ...data,
          }}
          />,
        }),
      );
    } else {
      dispatch(openConnectModal());
    }
  };

  const onSelectAsset = (selectedTokenButton) => () => {
    const handleSelectAsset = (selectedToken) => () => {
      if (selectedTokenButton === TOKEN_A_FORM_NAME) {
        setValue(TOKEN_A_FORM_NAME, selectedToken);
        setValue(TOKEN_B_FORM_NAME, bridgeTokens
          .find((token) => token.name === selectedToken.ported_asset));
        return dispatch(closeModalAction());
      }
      if (selectedTokenButton === TOKEN_B_FORM_NAME) {
        setValue(TOKEN_B_FORM_NAME, selectedToken);
        setValue(TOKEN_A_FORM_NAME, bridgeTokens
          .find((token) => token.name === selectedToken.ported_asset));
        return dispatch(closeModalAction());
      }
      throw new Error(`${selectedTokenButton} is not handled`);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
              <Controller
                name={TOKEN_A_FORM_NAME}
                control={control}
                render={(props) => (
                  <ConvertAssetLabel
                    {...props}
                    onClick={onSelectAsset(TOKEN_A_FORM_NAME)}
                    name={props.value?.name}
                    logo={props.value?.logo ?? questionLogo}
                  />
                )}
              />
              <div className={styles.icon}>
                <span
                  onClick={handleReverseTokens()}
                  className="icon-arrow-down color-primary"
                />
              </div>
              <Controller
                name={TOKEN_B_FORM_NAME}
                control={control}
                render={(props) => (
                  <ConvertAssetLabel
                    {...props}
                    onClick={onSelectAsset(TOKEN_B_FORM_NAME)}
                    name={props.value?.name}
                    logo={props.value?.logo ?? questionLogo}
                  />
                )}
              />

            </div>
            <label className="label-primary mt-3">Amount</label>
            <Controller
              name="amount"
              control={control}
              render={(props) => (
                <NumberOnlyInput
                  type="number"
                  placeholder="1"
                  value={props.value}
                  onChange={props.onChange}
                  className={styles.input}
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
