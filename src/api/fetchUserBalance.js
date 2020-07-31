export default (address) => global.fetch(`${process.env.REACT_APP_HORIZON}/accounts/${address}`)
  .then(async (res) => {
    if (res.ok) {
      return (await res.json()).balances.map((item) => ({
        ...item,
        balance: parseFloat(item.balance),
      }));
    }

    throw res;
  });
