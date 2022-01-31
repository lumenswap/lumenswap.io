import PropTypes from 'prop-types';
import Image from 'next/image';
import classNames from 'classnames';
import ExternalBlueArrow from 'assets/images/ExternalBlueArrow';
import Button from 'components/Button';
import numeral from 'numeral';
import useIsLogged from 'hooks/useIsLogged';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import { useDispatch } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import { getAssetDetails } from 'helpers/asset';
import CCard from 'components/CCard';
import styles from './styles.module.scss';

const GovernanceInfo = ({ item }) => {
  const {
    logo, name, desc, members, tiker, web, webLink, assetLink,
  } = item;

  const isLogged = useIsLogged();
  const foundUserAsset = useUserSingleAsset(getAssetDetails(item.asset));
  const dispatch = useDispatch();

  const handleJoinBtn = (e) => {
    e.preventDefault();
    if (isLogged && !foundUserAsset) {
      // do something
    }
    if (!isLogged) {
      dispatch(openConnectModal());
    }
  };

  return (
    <CCard className={classNames(styles.item, styles['lg-item'])}>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className={styles.img}>
            <Image src={logo} width={80} height={80} alt={name} />
          </div>
          <div className="d-flex flex-column">
            <div className={styles.title}>{name}</div>
            <div className={styles.text}>{numeral(members).format('0,0')} member</div>
          </div>
        </div>
        <div>
          <Button
            variant={(isLogged && foundUserAsset) ? 'basic' : 'primary'}
            content={(isLogged && foundUserAsset) ? 'Joined' : 'Join'}
            className={(isLogged && foundUserAsset) ? classNames(styles.btn, styles['btn-basic']) : styles.btn}
            onClick={handleJoinBtn}
          />
        </div>
      </div>
      <p className={classNames(styles.text, 'mb-0 mt-2')}>{desc}</p>
      <div className="mt-4">
        <div className={styles.detail}>
          <span className={styles.text}>Asset:</span>
          <a
            href={assetLink}
            target="_blank"
            rel="noreferrer"
            className={styles['asset-link']}
          >{tiker}
            <ExternalBlueArrow />
          </a>
        </div>
        <div className={styles.detail}>
          <span className={styles.text}>Website:</span>
          <a
            href={webLink}
            target="_blank"
            rel="noreferrer"
            className={styles['web-link']}
          >{web}
          </a>
        </div>
      </div>
    </CCard>
  );
};

GovernanceInfo.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GovernanceInfo;
