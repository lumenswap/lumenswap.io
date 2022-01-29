import urlMaker from 'helpers/urlMaker';
import LumenSwapHeader from 'components/LumenSwapHeader';
import AssetBox from 'components/LumenSwapHeader/AssetBox';
import { useRouter } from 'next/router';

const ignoredURLS = [urlMaker.dao.root(), urlMaker.dao.activity()];

const DAOHeader = ({ asset, assetBoxColor }) => {
  const leftSideLinks = [
    {
      name: 'Board',
      link: urlMaker.dao.root(),
      disableMainHref: true,
    },
    {
      name: 'My activity',
      link: urlMaker.dao.activity(),
      disableMainHref: true,
      restricted: true,
    },
  ];
  const AssetBoxGenerator = () => {
    const { asPath } = useRouter();
    if (ignoredURLS.findIndex((url) => url === asPath) !== -1) {
      return null;
    }
    return <AssetBox asset={asset} color={assetBoxColor} />;
  };

  return (
    <LumenSwapHeader
      leftSide={leftSideLinks}
      extraRightComponent={[AssetBoxGenerator]}
    />
  );
};

export default DAOHeader;
