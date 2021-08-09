import BN from './BN';

export function calculateMaxXLM(xlmBalance, subentry) {
  return new BN(xlmBalance)
    .minus((2 + subentry) * 0.5)
    .minus(0.00001).toString();
}
