export default function reportSwapClick() {
  global.fetch(`${process.env.REACT_APP_METRIC_SERVER}/swap`).catch(() => {});
}
