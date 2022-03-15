import Button from 'components/Button';
import { Controller } from 'react-hook-form';
import questionLogo from 'assets/images/question.png';
import { openModalAction, closeModalAction } from 'actions/modal';
import { useDispatch } from 'react-redux';
import SelectAsset from './SelectAsset';
import { TOKEN_A_FORM_NAME, TOKEN_B_FORM_NAME } from './tokenFormNames';
import styles from './styles.module.scss';

const ConvertAssetInput = ({
  control, inputName, bridgeTokens, setValue,
}) => {
  const dispatch = useDispatch();
  const onSelectAsset = () => () => {
    const handleSelectAsset = (selectedToken) => () => {
      if (inputName === TOKEN_A_FORM_NAME) {
        setValue(TOKEN_A_FORM_NAME, selectedToken);
        setValue(TOKEN_B_FORM_NAME, bridgeTokens
          .find((token) => token.name === selectedToken.ported_asset));
        return dispatch(closeModalAction());
      }
      if (inputName === TOKEN_B_FORM_NAME) {
        setValue(TOKEN_B_FORM_NAME, selectedToken);
        setValue(TOKEN_A_FORM_NAME, bridgeTokens
          .find((token) => token.name === selectedToken.ported_asset));
        return dispatch(closeModalAction());
      }
      throw new Error(`${inputName} is not handled`);
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
    <Controller
      name={inputName}
      control={control}
      render={(props) => (
        <Button
          {...props}
          variant="basic"
          size="100%"
          className={styles['convert-btn']}
          onClick={onSelectAsset()}
        >
          <div className="d-flex align-items-center">
            <img
              src={props.value?.logo ?? questionLogo}
              width={30}
              height={30}
              alt="assetLogo"
            />
            <div className={styles.currency}>{props.value?.name}</div>
          </div>
          <div className="icon-angle-down color-base" />
        </Button>
      )}
    />
  );
};

export default ConvertAssetInput;
