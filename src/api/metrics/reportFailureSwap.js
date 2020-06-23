export default function reportFailureSwap() {
  global.fetch(`${process.env.METRIC_SERVER}/swap_failure`).catch(() => {});
}
