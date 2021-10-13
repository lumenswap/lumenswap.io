export function pickSibling(max, min, position, count) {
  const result = [position];
  const resultLength = 1 + count * 2;
  let offset = 1;

  while (result.length < resultLength && (position + offset <= max || position - offset >= min)) {
    if (position + offset <= max) {
      result.push(position + offset);
    }

    if (position - offset >= min) {
      result.unshift(position - offset);
    }

    offset = offset + 1;
  }

  return result;
}

export function generateRange(max, min, currentPage) {
  if ((max - min + 1) <= 5) {
    const result = [];
    for (let i = min; i <= max; i = i + 1) {
      result.push(i);
    }

    return result;
  }

  const siblingCount = 1;
  const range = [];
  const siblings = pickSibling(
    max,
    min,
    currentPage,
    siblingCount,
  );

  if (siblings[0] !== min) {
    range.push(min);

    if (siblings[0] !== min + 1) {
      range.push({ label: '...', fnc: 'goback' });
    }
  }

  range.push(...siblings);

  const reverseSiblings = siblings.slice().reverse();

  if (reverseSiblings[0] !== max) {
    if (reverseSiblings[0] !== max - 1) {
      range.push({ label: '...', fnc: 'gonext' });
    }

    range.push(max);
  }

  return range;
}
