import LumenSwapHeader from 'components/LumenSwapHeader';
import urlMaker from 'helpers/urlMaker';
import ClaimLusiBtn from 'containers/nft/ClaimLusiBtn';

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
  const extraRightComponent = [ClaimLusiBtn];

  return (
    <LumenSwapHeader
      showLSP
      leftSide={leftSideLinks}
      extraRightComponent={extraRightComponent}
    />
  );
};

export default NFTHeader;
