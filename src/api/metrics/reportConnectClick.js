export default function reportConnectClick() {
  global.fetch(`${process.env.REACT_APP_METRIC_SERVER}/login_successful`).catch(() => {});
}
