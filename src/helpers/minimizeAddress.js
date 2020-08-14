export default (address = '', limit = 3) =>
  [address.slice(0, limit), '...', address.slice(-1 * limit)].join('');
