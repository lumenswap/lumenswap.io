import { useRef, useEffect } from 'react';
import getAssetDetails from 'helpers/getAssetDetails';
import { widget } from '../../../public/static/charting_library';
import { tvChartTrageAggregator } from './utils';

const defaultChartProps = {
  containerId: 'tv_chart_container',
  libraryPath: '/static/charting_library/',
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

export default function TVChart({ appSpotPair }) {
  const tvWidget = useRef();

  useEffect(() => {
    const datafeed = {
      onReady: (callback) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData));
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        console.log('[resolveSymbol] called');
        onSymbolResolvedCallback({
          ticker: `${appSpotPair.base.getCode()}/${appSpotPair.counter.getCode()}`,
          symbol: `${appSpotPair.base.getCode()}/${appSpotPair.counter.getCode()}`,
          has_intraday: true,
          supported_resolutions: configurationData.supported_resolutions,
          session: '24x7',
        });
      },
      getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        const { to, from, firstDataRequest } = periodParams;
        console.log('[getBars]: Method call', firstDataRequest, from, to);

        const res = await tvChartTrageAggregator(
          getAssetDetails(appSpotPair.base),
          getAssetDetails(appSpotPair.counter),
          Date.now() < to * 1000 ? Date.now() : to * 1000,
          200,
          reso[resolution],
        );

        if (res.length === 0) {
          onHistoryCallback([], { noData: true });
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

    const widgetOptions = {
      symbol: 'XLM/USDC',
      datafeed,
      container_id: defaultChartProps.containerId,
      library_path: defaultChartProps.libraryPath,
      autosize: true,
      disabled_features: [
        'header_symbol_search',
        'study_templates',
        'header_compare',
        'header_settings',
        'timeframes_toolbar',
      ],

    };

    if (tvWidget.current) {
      tvWidget.current.remove();
    }

    tvWidget.current = new widget(widgetOptions);
  }, [appSpotPair.base, appSpotPair.counter]);

  return (
    <div
      style={{ height: 405 }}
      id={defaultChartProps.containerId}
    />
  );
}
