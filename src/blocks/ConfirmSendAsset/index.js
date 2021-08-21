import { useDispatch } from 'react-redux';
import minimizeAddress from 'helpers/minimizeAddress';
import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';
import defaultTokens from 'tokens/defaultTokens';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import questionLogo from '../../assets/images/question.svg';
import styles from './styles.module.scss';

const ConfirmSendAsset = ({ data }) => {
  const dispatch = useDispatch();
  const foundAsset = defaultTokens.find((i) => isSameAsset(data.selectedAsset, getAssetDetails(i)));
  return (
    <div>
      <label className={styles.label}>Asset</label>
      <div className="d-flex align-items-center mt-1">
        <img src={foundAsset ? foundAsset.logo : questionLogo} width={26} height={26} alt="logo" />
        <span className={styles['asset-name']}>{data.selectedAsset.code}</span>
        <span className={styles['asset-web']}>{foundAsset ? foundAsset.web : minimizeAddress(data.selectedAsset.issuer)}</span>
      </div>
      <hr className={styles.hr} />
      <label className={styles.label}>Amount</label>
      <div className={styles.value}>{data.amount}</div>
      <hr className={styles.hr} />
      <label className={styles.label}>Destination</label>
      <div className={styles.value}>{minimizeAddress(data.destination)}</div>
      <hr className={styles.hr} />
      <label className={styles.label}>Memo</label>
      <div className={styles.value}>{data.memo}</div>
      <Button
        variant="primary"
        content="Confirm"
        className={styles.btn}
        onClick={() => {
          dispatch(closeModalAction());
        }}
      />
    </div>
  );
};

export default ConfirmSendAsset;
