import LusiLogo from '../assets/images/nft-sample.png';

const lusis = [
  {
    name: 'Lusi-1', price: 100, img: LusiLogo, id: '1',
  },
  {
    name: 'Lusi-2', price: 5100, img: LusiLogo, id: '2',
  },
  {
    name: 'Lusi-3', price: 16000, img: LusiLogo, id: '3',
  },
  {
    name: 'Lusi-4', price: 12000, img: LusiLogo, id: '4',
  },
  {
    name: 'Lusi-5', price: 400, img: LusiLogo, id: '5',
  },
  {
    name: 'Lusi-6', price: 726, img: LusiLogo, id: '6',
  },
  {
    name: 'Lusi-7', price: 300000, img: LusiLogo, id: '7',
  },
  {
    name: 'Lusi-8', price: 431, img: LusiLogo, id: '8',
  },
];

function getAllLusi() {
  return lusis;
}

function fetchAllLusi() {
  return new Promise((reslove) => setTimeout(reslove, 1000)).then(() => getAllLusi());
}

export default fetchAllLusi;
