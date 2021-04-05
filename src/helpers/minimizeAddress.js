export default (address = '', limit = 4) => [address.slice(0, limit), '...', address.slice(-1 * limit)].join('');
