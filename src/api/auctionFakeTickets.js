const tickets = [
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  }, {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },

  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
  {
    date: 1637397169853, amount: 200, price: 0.2, total: 200, settled: false,
  },
  {
    date: 1637397169853, amount: 100, price: 0.1, total: 100, settled: true,
  },
];

function fetchAuctionTickets(query) {
  if (query.currentPage === 1) {
    return new Promise((reslove) => setTimeout(reslove, 1000))
      .then(() => ({
        ticketsData: tickets.slice(0, query.number),
        totalPages: Math.floor(tickets.length / 10),
      }));
  }
  return new Promise((reslove) => setTimeout(reslove, 1000))
    .then(() => ({
      ticketsData: tickets.slice(query.currentPage * 10,
        query.currentPage * 10 + query.number),
      totalPages: Math.floor(tickets.length / 10),
    }));
}

export default fetchAuctionTickets;
