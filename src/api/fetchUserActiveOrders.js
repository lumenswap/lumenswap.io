export default async function fetchUserActiveOrders(address) {
  const res = await global.fetch(`${process.env.HORIZON}/accounts/${address}/offers?order=desc&limit=5&cursor=now`);
  if (res.ok) {
    return res.json();
  }
  throw await res.json();
}
