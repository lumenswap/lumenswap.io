import PropTypes from 'prop-types';
import classNames from 'classnames';
import ExternalBlueArrow from 'assets/images/ExternalBlueArrow';
import Button from 'components/Button';
import numeral from 'numeral';
import useIsLogged from 'hooks/useIsLogged';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import { extractLogoByToken, getAssetDetails } from 'helpers/asset';
import generateAddTrustLineTRX from 'stellar-trx/generateAddTrustLineTRX';
import CCard from 'components/CCard';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import { listAssets } from 'api/stellar';
import { useEffect, useState } from 'react';
import jsxThemeColors from 'helpers/jsxThemeColors';
import styles from './styles.module.scss';

function stellarExpertURLGenerator(code, issuer) {
  return `https://stellar.expert/explorer/public/asset/${code}-${issuer}`;
}

const GovernanceInfo = ({ governance }) => {
  const {
    name, description, assetCode, assetIssuer, website,
  } = governance;

  const asset = getAssetDetails({ code: assetCode, issuer: assetIssuer });
  const [communityMembersCount, setCommunityMembersCount] = useState(0);

  const isLogged = useIsLogged();
  const foundUserAsset = useUserSingleAsset(getAssetDetails(asset));
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.user.detail.address);

  useEffect(() => {
    async function fetchCommunityMemberCount() {
      const assets = await listAssets({ asset_code: asset.code });

      const assetData = assets._embedded.records.find(
        (fetchedAsset) => fetchedAsset.asset_code
        === governance.assetCode && fetchedAsset.asset_issuer
        === governance.assetIssuer,
      );

      setCommunityMembersCount(assetData?.num_accounts || 0);
    }

    fetchCommunityMemberCount();
  }, [governance]);

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
    <CCard className={classNames(styles.item, styles['lg-item'])}>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className={styles.img}>
            <img src={extractLogoByToken(asset)} width={80} height={80} alt={name} />
          </div>
          <div className={classNames('d-flex flex-column', styles['title-info'])}>
            <div className={styles.title}>{name}</div>
            <div className={styles['text-title']}>{numeral(communityMembersCount).format('0,0')} members</div>
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
      <p style={{ color: jsxThemeColors.rollingStoneToBombay }} className={classNames(styles.text, 'mb-0')}>{description}</p>
      <div className="mt-4">
        <div className={styles.detail}>
          <span className={styles.text}>Asset:</span>
          <a
            href={stellarExpertURLGenerator(asset.code, asset.issuer)}
            target="_blank"
            rel="noreferrer"
            className={styles['asset-link']}
          >{assetCode}
            <ExternalBlueArrow />
          </a>
        </div>
        <div className={styles.detail}>
          <span className={styles.text}>Website:</span>
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noreferrer"
            className={styles['web-link']}
          >{website}
          </a>
        </div>
      </div>
    </CCard>
  );
};

GovernanceInfo.propTypes = {
  governance: PropTypes.object.isRequired,
};

export default GovernanceInfo;
