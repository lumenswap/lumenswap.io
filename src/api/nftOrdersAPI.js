const orders = [
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '2',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '7',
  },
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '14',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '16',
  },
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '2',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '7',
  },
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '14',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '16',
  },
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '2',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '7',
  },
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '14',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '16',
  },
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '2',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '7',
  },
  {
    type: 'Buy', price: 5100, time: 1634744849124, id: '14',
  },
  {
    type: 'Sell', price: 510031, time: 1634744849124, id: '16',
  },
];

function getOrders() {
  return orders;
}

function fetchNFTOrders(userAdress) {
  return new Promise((reslove) => setTimeout(reslove, 1000)).then(() => getOrders());
}

export default fetchNFTOrders;
