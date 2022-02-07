import urlMaker from 'helpers/urlMaker';
import AssetBox from 'components/LumenSwapHeader/AssetBox';
import LumenSwapHeader from 'components/LumenSwapHeader';

const LotteryHeader = () => {
  const leftSide = [
    {
      name: 'Board', link: urlMaker.lottery.root(), disableMainHref: true,
    },
    {
      name: 'My Tickets', link: urlMaker.lottery.tickets(), restricted: true,
    },
    {
      name: 'Learn about lottery',
      link: 'https://medium.com/lumenswap/sixth-milestone-lottery-128e33d0aaa2',
      external: true,
    },
  ];

  const extraRightSideComponents = [<AssetBox />];

  return (
    <LumenSwapHeader
      leftSide={leftSide}
      extraRightComponent={extraRightSideComponents}
    />
  );
};

export default LotteryHeader;
