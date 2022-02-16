import PropTypes from 'prop-types';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import numeral from 'numeral';
import Button from 'components/Button';
import urlMaker from 'helpers/urlMaker';
import toSlug from 'helpers/slug';
import generateAddTrustLineTRX from 'stellar-trx/generateAddTrustLineTRX';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import { extractLogoByToken, getAssetDetails } from 'helpers/asset';
import CCard from 'components/CCard';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import styles from './styles.module.scss';

const GovernanceSummary = ({ item }) => {
  const {
    name, description, proposalCount = 0, communityMembersCount, assetCode, assetIssuer,
  } = item;
  const isLogged = useIsLogged();
  const userAddress = useSelector((state) => state.user.detail.address);
  const asset = getAssetDetails({ code: assetCode, issuer: assetIssuer });
  const foundUserAsset = useUserSingleAsset(asset);

  const dispatch = useDispatch();

  const handleJoinBtn = async (e) => {
    e.preventDefault();
    function func() {
      return generateAddTrustLineTRX(userAddress, asset);
    }
    if (isLogged && !foundUserAsset) {
      const trx = await showGenerateTrx(func, dispatch);
      await showSignResponse(trx, dispatch);
    }
    if (!isLogged) {
      dispatch(openConnectModal());
    }
  };

  return (
    <Link href={urlMaker.dao.singleDao.root(toSlug(name))} passHref>
      <a className="text-decoration-none">
        <CCard className={classNames(styles.item, styles['md-item'])}>
          <div className="px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className={styles.img}>
                <Image
                  src={extractLogoByToken(asset)}
                  width={40}
                  height={40}
                  alt={name}
                />
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
            <p className={styles.para}>{description}</p>
            <div className={styles.proposal}>
              <div className={styles.badge}>{proposalCount}</div>
              Active proposal
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles['info-col']}>
              <div className={styles.value}>{numeral(communityMembersCount).format('0,0')}</div>
              <div className={styles.subject}>Community member</div>
            </div>
            <div className={styles['info-col']}>
              <div className={styles.value}>{assetCode}</div>
              <div className={styles.subject}>Tiker</div>
            </div>
          </div>
        </CCard>
      </a>
    </Link>
  );
};

GovernanceSummary.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GovernanceSummary;
