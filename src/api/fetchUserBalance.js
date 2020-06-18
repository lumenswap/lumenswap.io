export default (address) => global.fetch(`${process.env.HORIZON}/accounts/${address}`)
  .then(async (res) => {
    if (res.ok) {
      return (await res.json()).balances.map((item) => ({
        ...item,
        balance: parseFloat(item.balance),
      }));
    }

    throw res;
  });
