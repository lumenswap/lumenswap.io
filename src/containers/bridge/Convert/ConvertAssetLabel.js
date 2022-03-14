import Button from 'components/Button';
import { Controller } from 'react-hook-form';
import questionLogo from 'assets/images/question.png';
import styles from './styles.module.scss';

const ConvertAssetInputLabel = ({
  onClick, control, inputName,
}) => (
  <Controller
    name={inputName}
    control={control}
    render={(props) => (
      <Button
        {...props}
        variant="basic"
        size="100%"
        className={styles['convert-btn']}
        onClick={onClick}
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

export default ConvertAssetInputLabel;
