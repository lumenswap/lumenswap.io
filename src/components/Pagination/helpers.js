export function pickSibling(array, index, count) {
  const result = [];
  const newCount = index === 0 || index === array.length - 1 ? count * 2 : count;
  for (const [innerIndex, item] of array.entries()) {
    if (Math.abs(innerIndex - index) <= newCount) {
      result.push(item);
    }
  }

  return result;
}

export function generateRange(pages, currentPage) {
  const pagesInArray = Array.from({ length: pages }, (i, index) => index + 1);
  if (pages > 3) {
    const range = [];
    const siblings = pickSibling(
      pagesInArray,
      pagesInArray.findIndex((i) => i === currentPage),
      1,
    );

    if (siblings[0] === 1) {
      range.push(...siblings);
    } else if (siblings[0] === 2) {
      range.push(1, ...siblings);
    } else {
      range.push(1, { label: '...', fnc: 'goback' });
      range.push(...siblings);
    }

    const lastSibling = siblings.slice(-1)[0];
    const lastPage = pagesInArray.slice(-1)[0];
    if (lastSibling === lastPage - 1) {
      range.push(lastPage);
    } else if (lastSibling < lastPage - 1) {
      range.push({ label: '...', fnc: 'gonext' }, lastPage);
    }

    return {
      range,
      current: currentPage,
    };
  }

  return {
    range: pagesInArray,
    current: currentPage,
  };
}
