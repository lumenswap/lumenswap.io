import Button from 'components/Button';
import styles from './styles.module.scss';

const ConvertAssetLabel = ({
  logo, name, onClick,
}) => (
  <Button
    variant="basic"
    size="100%"
    className={styles['convert-btn']}
    onClick={onClick}
  >
    <div className="d-flex align-items-center">
      <img src={logo} width={30} height={30} alt="assetLogo" />
      <div className={styles.currency}>{name}</div>
    </div>
    <div className="icon-angle-down color-base" />
  </Button>
);

export default ConvertAssetLabel;
