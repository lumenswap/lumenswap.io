import { useRef, useEffect } from 'react';
import USDC from 'tokens/USDC';
import XLM from 'tokens/XLM';
import getAssetDetails from 'helpers/getAssetDetails';
import { widget } from '../../../public/static/charting_library';
import { tvChartTrageAggregator } from './utils';

const defaultProps = {
  symbol: 'AAPL',
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

const configurationData = {
  supported_resolutions: ['1', '5', '15', '1H', '1D', '1W'],
};

const reso = {
  1: 60000,
  5: 300000,
  15: 900000,
  60: 3600000,
  '1H': 3600000,
  '1D': 86400000,
  '1W': 604800000,
};

const datafeed = {
  onReady: (callback) => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },
  resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    console.log('[resolveSymbol] called');
    console.log(symbolName);
    onSymbolResolvedCallback({
      ticker: 'XLM/USDC',
      symbol: 'XLM/USDC',
      has_intraday: true,
      supported_resolutions: configurationData.supported_resolutions,
    });
  },
  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const { to, firstDataRequest } = periodParams;
    console.log('[getBars]: Method call', firstDataRequest);

    const res = await tvChartTrageAggregator(
      getAssetDetails(XLM),
      getAssetDetails(USDC),
      to * 1000,
      200,
      reso[resolution],
    );

    if (res.length === 0) {
      onHistoryCallback([], { noData: false });
    } else {
      onHistoryCallback(res, { noData: false });
    }
  },

  subscribeBars: () => {
    console.log('sub');
  },

  unsubscribeBars: () => {
    console.log('unsub');
  },
};

export default function TVChart() {
  const tvWidget = useRef();

  useEffect(() => {
    const widgetOptions = {
      symbol: 'XLM/USDC',
      datafeed,
      container_id: defaultProps.containerId,
      library_path: defaultProps.libraryPath,
      autosize: true,
      disabled_features: ['header_symbol_search', 'study_templates'],
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
