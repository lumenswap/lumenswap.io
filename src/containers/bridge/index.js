import { useForm, Controller, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal, openModalAction } from 'actions/modal';
import createOrderRequest from 'api/birdgeAPI/createOrder';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import Button from 'components/Button';
import BN from 'helpers/BN';
import Input from 'components/Input';
import useIsLogged from 'hooks/useIsLogged';
import NumberOnlyInput from 'components/NumberOnlyInput';
import { useEffect, useState } from 'react';
import useUserAddress from 'hooks/useUserAddress';
import Submitting from 'components/Submitting';
import { getAssetDetails, isSameAsset } from 'helpers/asset';
import { fetchAccountFullDetails } from 'api/stellar';
import generateAddTrustLineTRX from 'stellar-trx/generateAddTrustLineTRX';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import classNames from 'classnames';
import decimalCounter from './decimalCounter';
import bridgeFormCustomValidator from './bridgeFormCustomValidator';
import ConvertAssetInput from './ConvertAssetInput';
import { TOKEN_A_FORM_NAME, TOKEN_B_FORM_NAME } from './tokenFormNames';
import ConvertConfirmModalContent from './ConvertConfirmModalContent';
import styles from './styles.module.scss';
import FailDialog from './ConfirmModal/FailDialog';
import ShowFeeSection from './ShowFeeSection';

const customValidateAmount = (value, onChange, formValues) => {
  const minAmountPrecision = Math.min(formValues[TOKEN_A_FORM_NAME].precision,
    formValues[TOKEN_B_FORM_NAME].precision);

  if (new BN(decimalCounter(value)).lte(minAmountPrecision)) {
    return onChange(value);
  }
  return () => {};
};

function userHasTrustLine(currentToToken, balances) {
  return !!balances
    .filter((balance) => (balance.asset_type === 'credit_alphanum4' || balance.asset_type === 'credit_alphanum12'))
    .find((balance) => isSameAsset(getAssetDetails({
      code: balance.asset_code,
      issuer: balance.asset_issuer,
    }),
    getAssetDetails({ code: currentToToken.name, issuer: process.env.REACT_APP_L_ISSUER })));
}

const BridgeConvert = ({ bridgeTokens }) => {
  const isLoggedIn = useIsLogged();
  const dispatch = useDispatch();
  const userBalances = useSelector((state) => state.userBalance);
  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const [destinationFullDetails, setDestinationFullDetails] = useState(null);
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState,
    trigger,
    setError,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tokenA: bridgeTokens[0],
      tokenB: bridgeTokens.find((token) => token.name === bridgeTokens[0].ported_asset),
      amount: null,
      destination: null,
    },
    resolver: (formData) => bridgeFormCustomValidator(formData, userBalances),
  });
  const handleReverseTokens = () => () => {
    const currentValues = getValues();
    setValue(TOKEN_A_FORM_NAME, currentValues[TOKEN_B_FORM_NAME]);
    setValue(TOKEN_B_FORM_NAME, currentValues[TOKEN_A_FORM_NAME]);
  };
  const userAddress = useUserAddress();

  const onSubmit = async (data) => {
    const currentToToken = data[TOKEN_B_FORM_NAME];
    let generateTrustLineFunction = null;
    let destination = data.destination;

    if (isLoggedIn) {
      if (currentToToken.network === 'stellar') {
        destination = userAddress;

        const toAsset = getAssetDetails({
          code: currentToToken.name, issuer: process.env.REACT_APP_L_ISSUER,
        });

        generateTrustLineFunction = () => generateAddTrustLineTRX(userAddress, toAsset);

        if (currentToToken.network === 'stellar' && destination?.length === 56 && destinationFullDetails?.data?.balances) {
          if (!userHasTrustLine(currentToToken, destinationFullDetails.data.balances)) {
            const trx = await showGenerateTrx(generateTrustLineFunction, dispatch);
            await showSignResponse(trx, dispatch);
            setDestinationFullDetails(null);
          }
        }
      }

      setCreateOrderLoading(true);
      createOrderRequest({
        from_amount: data.amount,
        from_asset: data[TOKEN_A_FORM_NAME].name,
        user_destination: destination,
        by_address: userAddress,
      }).then((res) => {
        setCreateOrderLoading(false);
        if (res.status === 200) {
          return dispatch(
            openModalAction({
              modalProps: {
                className: 'main p-0',
                hasClose: false,
              },
              content: <ConvertConfirmModalContent convertInfo={res.data} />,
            }),
          );
        }
        return dispatch(openModalAction({
          modalProps: {
          },
          content: <FailDialog />,
        }));
      }).catch((err) => {
        setError('tokenA', { type: 'custom', message: 'Failed to create order' });
        setCreateOrderLoading(false);
      });
    } else {
      dispatch(openConnectModal());
    }
  };

  function generateSubmitButtonContent() {
    for (const error of Object.values(formState.errors)) {
      if (error && error.message) {
        return error.message;
      }
    }

    const formValues = getValues();
    const currentToToken = formValues[TOKEN_B_FORM_NAME];

    if (currentToToken.network === 'stellar' && userAddress && destinationFullDetails?.data?.balances) {
      if (!userHasTrustLine(currentToToken, destinationFullDetails.data.balances)) {
        return `Create trustline for ${currentToToken.name}`;
      }
    }

    return 'Convert';
  }

  useEffect(() => {
    const formValues = getValues();

    async function fetchAccountDetails() {
      const currentToToken = formValues[TOKEN_B_FORM_NAME];

      if (currentToToken.network === 'stellar' && userAddress) {
        const fetchedDestinationDetails = await fetchAccountFullDetails(userAddress);
        setDestinationFullDetails(fetchedDestinationDetails);
      }
    }

    if (!destinationFullDetails
       && destinationFullDetails?.data?.account_id !== userAddress) {
      fetchAccountDetails();
    }

    if (getValues()[TOKEN_B_FORM_NAME].network === 'stellar' && userAddress) {
      setValue('destination', userAddress);
    }
    if (getValues()[TOKEN_B_FORM_NAME].network !== 'stellar' && userAddress === getValues().destination) {
      setValue('destination', '');
    }
  }, [userAddress, useWatch({ control, name: TOKEN_B_FORM_NAME })]);
  useEffect(() => {
    trigger();
  }, [useWatch({ control })]);

  const handleSetMaxAmount = () => {
    if (isLoggedIn) {
      const foundAssetMaxAmount = userBalances.find((balance) => isSameAsset(getAssetDetails({
        code: balance.asset.code,
        issuer: balance.asset.issuer,
      }),
      getAssetDetails({
        code: getValues()[TOKEN_A_FORM_NAME].name,
        issuer: process.env.REACT_APP_L_ISSUER,
      })));

      if (foundAssetMaxAmount) {
        setValue('amount', foundAssetMaxAmount.balance);
      }
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
            <div className={classNames(styles['amount-container'], 'mt-3')}><label className="label-primary">Amount</label>
              {(getValues()[TOKEN_A_FORM_NAME].network === 'stellar' && isLoggedIn) && (
              <div className={styles['max-btn-container']}>
                <div onClick={handleSetMaxAmount} className={styles['max-btn-area']}>
                  <div className={styles['max-btn']}>Max</div>
                  <div className={styles['max-btn-arrow-container']}><div className={styles['max-btn-arrow']} /></div>
                </div>
              </div>
              )}
            </div>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <NumberOnlyInput
                  type="number"
                  placeholder="1"
                  value={field.value}
                  onChange={(value) => {
                    customValidateAmount(value, field.onChange, getValues());
                  }}
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
                  className={styles['destination-input']}
                  type="text"
                  disabled={getValues()[TOKEN_B_FORM_NAME].network === 'stellar'}
                  placeholder="G …"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {(getValues().amount && getValues()[TOKEN_A_FORM_NAME].network === 'stellar') && <ShowFeeSection convertInfo={getValues()} />}

            <Button
              variant="primary"
              htmlType="submit"
              size="100%"
              fontWeight={500}
              className={styles['submit-btn']}
              disabled={formState.isValidating || !formState.isValid || createOrderLoading}
              content={(createOrderLoading || formState.isValidating)
                ? <Submitting loadingSize={21} />
                : generateSubmitButtonContent()}
            />
          </form>
        </div>
      </div>
    </BridgeContainer>
  );
};

export default BridgeConvert;
