import PropTypes from 'prop-types';
import slugify from 'slugify';
import classNames from 'classnames';
import Link from 'next/link';
import numeral from 'numeral';
import Button from 'components/Button';
import urlMaker from 'helpers/urlMaker';
import generateAddTrustLineTRX from 'stellar-trx/generateAddTrustLineTRX';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import { extractLogoByToken, getAssetDetails } from 'helpers/asset';
import CCard from 'components/CCard';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import { useEffect, useState } from 'react';
import { listAssets } from 'api/stellar';
import truncateText from 'helpers/truncateText';
import useDefaultTokens from 'hooks/useDefaultTokens';
import styles from './styles.module.scss';

const GovernanceSummary = ({ item }) => {
  const {
    name, description, proposalCount = 0, assetCode, assetIssuer,
  } = item;
  const [communityMembersCount, setCommunityMembersCount] = useState(0);
  const isLogged = useIsLogged();
  const userAddress = useSelector((state) => state.user.detail.address);
  const asset = getAssetDetails({ code: assetCode, issuer: assetIssuer });
  const foundUserAsset = useUserSingleAsset(asset);
  const defaultTokens = useDefaultTokens();

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCommunityMemberCount() {
      const assets = await listAssets({ asset_code: asset.code });

      const assetData = assets._embedded.records.find(
        (fetchedAsset) => fetchedAsset.asset_code
        === item.assetCode && fetchedAsset.asset_issuer
        === item.assetIssuer,
      );

      setCommunityMembersCount(assetData?.num_accounts || 0);
    }

    fetchCommunityMemberCount();
  }, [item]);

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
    <Link href={urlMaker.dao.singleDao.root(slugify(name).toLowerCase())} passHref>
      <a className="text-decoration-none">
        <CCard className={classNames(styles.item, styles['md-item'])}>
          <div className="px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className={styles.img}>
                <img
                  src={extractLogoByToken(asset, defaultTokens)}
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
            <p className={styles.para}>{truncateText(description, 162)}</p>
            <div className={styles.proposal}>
              <div className={styles.badge}>{proposalCount}</div>
              Active proposal
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles['info-col']}>
              <div className={styles.value}>{numeral(communityMembersCount).format('0,0')}</div>
              <div className={styles.subject}>Members</div>
            </div>
            <div className={styles['info-col']}>
              <div className={styles.value}>{assetCode}</div>
              <div className={styles.subject}>Asset</div>
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
