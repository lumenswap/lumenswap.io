import { useRef, useEffect } from 'react';
import { widget } from '../../../public/static/charting_library';

const defaultProps = {
  symbol: 'AAPL',
  interval: 'D',
  containerId: 'tv_chart_container',
  datafeedUrl: 'https://demo_feed.tradingview.com',
  libraryPath: '/static/charting_library/',
  chartsStorageUrl: 'https://saveload.tradingview.com',
  chartsStorageApiVersion: '1.1',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: false,
  autosize: true,
  studiesOverrides: {},
};

export default function TVChart() {
  const tvWidget = useRef();

  console.log('here');

  useEffect(() => {
    const widgetOptions = {
      symbol: defaultProps.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(defaultProps.datafeedUrl),
      interval: defaultProps.interval,
      container_id: defaultProps.containerId,
      library_path: defaultProps.libraryPath,

      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
    };

    tvWidget.current = new widget(widgetOptions);

    tvWidget.current.onChartReady(() => {
      tvWidget.current.headerReady().then(() => {
        const button = tvWidget.current.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () => tvWidget.current.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            console.log('Noticed!');
          },
        }));

        button.innerHTML = 'Check API';
      });
    });
  }, []);

  return (
    <div
      style={{ height: 600 }}
      id={defaultProps.containerId}
    />
  );
}
