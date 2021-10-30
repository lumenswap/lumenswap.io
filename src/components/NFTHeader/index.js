import { useRouter } from 'next/router';
import LumenSwapHeader from 'components/LumenSwapHeader';
import urlMaker from 'helpers/urlMaker';
import ClaimLusiBtn from 'containers/nft/ClaimLusiBtn';
import useLoggedInfo from 'hooks/useUserLoggedInfo';

const NFTHeader = () => {
  const isLogged = useLoggedInfo();
  const { asPath } = useRouter();
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
      name: 'Orders',
      link: urlMaker.nft.orders(),
      restricted: true,
    },
    {
      name: 'Stats',
      link: urlMaker.nft.stats(),
    },
  ];
  const extraRightComponent = [];
  if (isLogged && asPath === urlMaker.nft.root()) {
    extraRightComponent.push(ClaimLusiBtn);
  }

  return (
    <LumenSwapHeader
      showLSP
      leftSide={leftSideLinks}
      extraRightComponent={extraRightComponent}
    />
  );
};

export default NFTHeader;
