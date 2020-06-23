export default function reportSwapConfirmClick() {
  global.fetch(`${process.env.METRIC_SERVER}/swap_confirm`).catch(() => {});
}
