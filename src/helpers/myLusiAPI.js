import LusiLogo from '../assets/images/nft-sample.png';

const lusis = [
  {
    name: 'Lusi-2', price: 5100, img: LusiLogo, id: '2',
  },
  {
    name: 'Lusi-4', price: 12000, img: LusiLogo, id: '4',
  },
  {
    name: 'Lusi-7', price: 300000, img: LusiLogo, id: '7',
  },
  {
    name: 'Lusi-8', price: 431, img: LusiLogo, id: '8',
  },
];

function getMyLusi() {
  return lusis;
}

function fetchMyLusi(userAdress) {
  return new Promise((reslove) => setTimeout(reslove, 1000)).then(() => getMyLusi());
}

export default fetchMyLusi;
