import numeral from 'numeral';
import sevenDigit from './sevenDigit';

export default function humanAmount(amount, big = false) {
  let format = '0,0.[0000000]';
  if (big) {
    format = '0.[00]a';
  }

  return numeral(sevenDigit(amount)).format(format);
}
