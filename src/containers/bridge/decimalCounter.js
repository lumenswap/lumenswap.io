import BN from 'helpers/BN';

function decimalCounter(number) {
  if (number && !new BN(number).isInteger()) {
    return number.toString().split('.')[1].length;
  }
  return 0;
}

export default decimalCounter;
