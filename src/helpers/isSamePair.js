import { isSameAsset } from 'helpers/asset';

export default function isSamePair(first, second) {
  return isSameAsset(first.base, second.base)
  && isSameAsset(first.counter, second.counter);
}
