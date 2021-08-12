import BN from './BN';

export function calculateMaxXLM(xlmBalance, subentry) {
  const max = new BN(xlmBalance)
    .minus((2 + subentry) * 0.5)
    .minus(0.005);

  if (max.isLessThan('0')) {
    return '0';
  }

  return max.toString();
}
