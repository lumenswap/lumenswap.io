export default function reportLoginClick() {
  global.fetch(`${process.env.METRIC_SERVER}/login`).catch(() => {});
}
