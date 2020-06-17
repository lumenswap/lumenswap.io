export default (address = '') => [address.slice(0, 3), '...', address.slice(-3)].join('');
