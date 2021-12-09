import urlMaker from 'helpers/urlMaker';
import LumenSwapHeader from 'components/LumenSwapHeader';

const RewardHeader = () => {
  const leftSide = [
    {
      name: 'Dashboard', link: urlMaker.reward.root(),
    },
    {
      name: 'How to get rewards',
      link: 'https://medium.com/lumenswap/lumenswap-ecosystem-reward-25f1ddd61ab7',
      external: true,
    },
  ];

  return (
    <LumenSwapHeader
      leftSide={leftSide}
    />
  );
};

export default RewardHeader;
