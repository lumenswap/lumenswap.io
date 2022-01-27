import urlMaker from 'helpers/urlMaker';
import LumenSwapHeader from 'components/LumenSwapHeader';

const DAOHeader = ({ asset }) => {
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
  const assetColorGenerator = (code) => {
    switch (code) {
      case 'LSP': {
        return '#0e41f5';
      }
      case 'RBT': {
        return '#1d1d1d';
      }
      default: {
        return null;
      }
    }
  };

  return (
    <LumenSwapHeader
      showAssetBox
      leftSide={leftSideLinks}
      assetBoxProps={{ color: assetColorGenerator(asset?.code), asset }}
      hideAssetShowBox={[urlMaker.dao.root(), urlMaker.dao.activity()]}
    />
  );
};

export default DAOHeader;
