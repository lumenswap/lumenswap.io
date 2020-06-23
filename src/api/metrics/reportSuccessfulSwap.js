export default function reportSuccessfulSwap() {
  global.fetch(`${process.env.METRIC_SERVER}/swap_successful`).catch(() => {});
}
