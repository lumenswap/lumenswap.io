import numeral from 'numeral';
import BN from 'helpers/BN';
import sevenDigit from './sevenDigit';

export default function humanAmount(amount, big = false) {
  if (new BN(amount).isLessThan('0.000001')) {
    if (new BN(amount).isEqualTo(0)) {
      return 0;
    }
    return amount;
  }

  let format = '0,0.[0000000]';
  if (big) {
    format = '0.[00]a';
  }

  return numeral(sevenDigit(amount)).format(format);
}
