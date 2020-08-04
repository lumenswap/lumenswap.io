export default function reportSwapConfirmClick() {
  global.fetch(`${process.env.REACT_APP_METRIC_SERVER}/swap_confirm`).catch(() => {});
}
