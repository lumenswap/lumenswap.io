import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { openConnectModal, openModalAction } from 'actions/modal';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import Button from 'components/Button';
import Input from 'components/Input';
import useIsLogged from 'hooks/useIsLogged';
import NumberOnlyInput from 'components/NumberOnlyInput';
import ConvertAssetInput from './ConvertAssetInput';
import { TOKEN_A_FORM_NAME, TOKEN_B_FORM_NAME } from './tokenFormNames';
import ConvertConfirmModalContent from './ConvertConfirmModalContent';
import styles from './styles.module.scss';

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
    const currentValues = getValues();
    setValue(TOKEN_A_FORM_NAME, currentValues[TOKEN_B_FORM_NAME]);
    setValue(TOKEN_B_FORM_NAME, currentValues[TOKEN_A_FORM_NAME]);
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

  return (
    <BridgeContainer title="Bridge Convert | Lumenswap">
      <div className="layout main d-flex justify-content-center">
        <div className={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
              <ConvertAssetInput
                inputName={TOKEN_A_FORM_NAME}
                control={control}
                bridgeTokens={bridgeTokens}
                setValue={setValue}
              />
              <div className={styles.icon}>
                <span
                  onClick={handleReverseTokens()}
                  className="icon-arrow-down color-primary"
                />
              </div>
              <ConvertAssetInput
                inputName={TOKEN_B_FORM_NAME}
                control={control}
                bridgeTokens={bridgeTokens}
                setValue={setValue}
              />
            </div>
            <label className="label-primary mt-3">Amount</label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <NumberOnlyInput
                  type="number"
                  placeholder="1"
                  value={field.value}
                  onChange={field.onChange}
                  className={styles.input}
                />
              )}
            />

            <label className="label-primary mt-3">Destination</label>
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="G …"
                  value={field.value}
                  onChange={field.onChange}
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
