import LumenSwapHeader from 'components/LumenSwapHeader';
import urlMaker from 'helpers/urlMaker';
import NLSP from 'tokens/NLSP';
import ClaimLusiBtn from './ClaimLusiBtn';

const NFTHeader = () => {
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
      showAssetBox
      assetBoxProps={{ color: '#DF4886', asset: NLSP }}
      leftSide={leftSideLinks}
      extraRightComponent={[<ClaimLusiBtn />]}
    />
  );
};

export default NFTHeader;
