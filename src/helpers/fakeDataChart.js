let base = +new Date(1968, 9, 3);
const oneDay = 24 * 3600 * 1000;
const date = [];
const data = [Math.random() * 300];
for (let i = 1; i < 2000; i++) {
  const now = new Date((base = base + oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  const value = Math.round((Math.random() - 0.5) * 10 + data[i - 1]);
  data.push((value < 0) ? -value : value);
}

export default { data, date };
