import { removeCustomTokenAction } from 'actions/userCustomTokens';
import { useDispatch, useSelector } from 'react-redux';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

function TokenItem({ asset, selectAsset }) {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.logged);
  return (
    <div
      className={styles.box}
      key={`${asset.details.getCode()}-${asset.details.getIssuer()}`}
      onClick={() => selectAsset(asset)}
    >
      <div className="d-flex align-items-center">
        {asset.logo ? (
          <img src={asset.logo} alt="logo" width={22} height={22} />
        ) : (
          <div className={styles.circle}>
            <span className="icon-question-circle" />
          </div>
        )}
        <div className={styles.info}>
          <h6 className={styles.text}>
            {asset.details.getCode()}
            {asset.type === 'custom' && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeCustomTokenAction(asset.details));
              }}
            >
              {' '}
              (delete)
            </span>
            )}
          </h6>
          <p className={styles.desc}>{asset.web}</p>
        </div>
      </div>
      <div className={styles.text}>
        {isLogged && humanAmount(asset.balance)}
      </div>
    </div>
  );
}

export default TokenItem;
