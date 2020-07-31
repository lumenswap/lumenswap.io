export default function reportSuccessfulSwap() {
  global.fetch(`${process.env.REACT_APP_METRIC_SERVER}/swap_successful`).catch(() => {});
}
