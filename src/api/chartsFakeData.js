const lineData = [];

const xAxisData = [];
const barData = [];
for (let i = 20; i < 180; i++) {
  xAxisData.push(1636489119415 + (i * 60 * 30 * 10000));
  barData.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
}

for (let i = 0; i < 1000; i++) {
  lineData.push(Math.round(Math.random() * 100));
}

export const chartData = {
  date: xAxisData,
  lineData,
  barData,
};
