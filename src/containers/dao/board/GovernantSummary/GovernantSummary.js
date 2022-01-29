import PropTypes from 'prop-types';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import numeral from 'numeral';
import Button from 'components/Button';
import urlMaker from 'helpers/urlMaker';
import { useDispatch } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import { getAssetDetails } from 'helpers/asset';
import CCard from 'components/CCard';
import styles from './styles.module.scss';

const GovernantSummary = ({ item }) => {
  const {
    logo, officialName, name, desc, proposals, members, tiker,
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
    <Link href={urlMaker.dao.singleDao.root(officialName)} passHref>
      <a className="text-decoration-none">
        <CCard className={classNames(styles.item, styles['md-item'])}>
          <div className="px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className={styles.img}>
                <Image src={logo} width={40} height={40} alt={name} />
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
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.para}>{desc}</p>
            <div className={styles.proposal}>
              <div className={styles.badge}>{proposals}</div>
              Active proposal
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles['info-col']}>
              <div className={styles.value}>{numeral(members).format('0,0')}</div>
              <div className={styles.subject}>Community member</div>
            </div>
            <div className={styles['info-col']}>
              <div className={styles.value}>{tiker}</div>
              <div className={styles.subject}>Tiker</div>
            </div>
          </div>
        </CCard>
      </a>
    </Link>
  );
};

GovernantSummary.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GovernantSummary;
