export default function reportLoginClick() {
  global.fetch(`${process.env.REACT_APP_METRIC_SERVER}/login`).catch(() => {});
}
