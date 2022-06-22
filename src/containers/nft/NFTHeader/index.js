import LumenSwapHeader from 'components/LumenSwapHeader';
import AssetBox from 'components/LumenSwapHeader/AssetBox';
import { extractTokenFromCode } from 'helpers/defaultTokenUtils';
import urlMaker from 'helpers/urlMaker';
import useDefaultTokens from 'hooks/useDefaultTokens';
import ClaimLusiBtn from './ClaimLusiBtn';

const NFTHeader = () => {
  const defaultTokens = useDefaultTokens();
  const leftSideLinks = [
    {
      name: "All Lusi's",
      link: urlMaker.nft.root(),
      disableMainHref: true,
    },
    {
      name: 'My Lusi',
      link: urlMaker.nft.myLusi(),
      restricted: true,
    },
    {
      name: 'My Offers',
      link: urlMaker.nft.orders(),
      restricted: true,
    },
    {
      name: 'Stats',
      link: urlMaker.nft.stats(),
    },
  ];

  return (
    <LumenSwapHeader
      leftSide={leftSideLinks}
      extraRightComponent={[<ClaimLusiBtn />, <AssetBox color="#DF4886" asset={extractTokenFromCode('NLSP', defaultTokens)} />]}
    />
  );
};

export default NFTHeader;
