export default function reportConnectClick() {
  global.fetch(`${process.env.METRIC_SERVER}/login_successful`).catch(() => {});
}
