import urlMaker from 'helpers/urlMaker';
import LumenSwapHeader from 'components/LumenSwapHeader';
import RBT from 'tokens/RBT';

const DAOHeader = () => {
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
    },
  ];

  return (
    <LumenSwapHeader
      showAssetBox
      leftSide={leftSideLinks}
      assetBoxProps={{ color: '#1d1d1d', asset: RBT }}
    />
  );
};

export default DAOHeader;
