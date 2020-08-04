export default function reportFailureSwap() {
  global.fetch(`${process.env.REACT_APP_METRIC_SERVER}/swap_failure`).catch(() => {});
}
