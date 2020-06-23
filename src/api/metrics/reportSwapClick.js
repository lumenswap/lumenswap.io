export default function reportSwapClick() {
  global.fetch(`${process.env.METRIC_SERVER}/swap`).catch(() => {});
}
