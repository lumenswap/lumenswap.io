import LumenSwapHeader from 'components/LumenSwapHeader';
import urlMaker from 'helpers/urlMaker';

const BridgeHeader = () => {
  const leftSide = [
    {
      name: 'Convert',
      link: urlMaker.bridge.root(),
      disableMainHref: true,
    },
  ];

  const rightSide = [
    {
      name: 'My activities',
      restricted: true,
      link: urlMaker.bridge.activity.root(),
      disableMainHref: true,
    },
  ];

  return (
    <LumenSwapHeader
      rightSide={rightSide}
      leftSide={leftSide}
    />
  );
};

export default BridgeHeader;
