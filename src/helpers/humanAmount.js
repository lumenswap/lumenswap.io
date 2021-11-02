import numeral from 'numeral';
import sevenDigit from './sevenDigit';

export default function humanAmount(amount) {
  return numeral(sevenDigit(amount)).format('0,0.[0000000]');
}
