export default function normalizeAmount(number) {
  const [before, after] = number.toString().split('.');
  const integer = before || '0';

  if (!after) {
    return integer;
  }

  switch (before.length) {
    case 0:
      return parseFloat(`${integer}.${after.slice(0, 7)}`, 10);
    case 1:
      return parseFloat(`${integer}.${after.slice(0, 6)}`, 10);
    case 2:
      return parseFloat(`${integer}.${after.slice(0, 5)}`, 10);
    case 3:
      return parseFloat(`${integer}.${after.slice(0, 4)}`, 10);
    case 4:
      return parseFloat(`${integer}.${after.slice(0, 3)}`, 10);
    case 5:
      return parseFloat(`${integer}.${after.slice(0, 2)}`, 10);
    default:
      return parseFloat(`${integer}`, 10);
  }
}
