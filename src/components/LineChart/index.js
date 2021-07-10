import classNames from 'classnames';
import Loading from 'components/Loading';

import { Line } from 'react-chartjs-2';

import styles from './styles.module.scss';

const lineColor = '#e3e9ff';

const options = {
  responsive: true,
  interaction: {
    intersect: false,
    axis: 'x',
  },
  plugins: {
    legend: false,
  },
  scales: {
    x: {
      grid: {
        borderColor: lineColor,
        color: lineColor,
      },
      title: {
        display: false,
      },
    },
    y: {
      grid: {
        borderColor: lineColor,
        color: lineColor,
      },
      ticks: {
        callback(value) {
          return `${value / 1000}k`;
        },
      },
    },
  },
  stepped: true,
};

export default function LineChart({ data }) {
  const chartData = {
    labels: ['0.0', '0.01', '0.02', '0.03', '0.04', '0.05', '0.06'],
    datasets: [{
      data: [8000, 6000, 5000, 4000, 3000, 2000, 1000],
      fill: true,
      borderColor: '#0e41f5',
      backgroundColor: 'rgba(227, 233, 255, 0.5)',
      borderWidth: 1,
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBorderWidth: 0,
    }],
  };

  if (data) {
    chartData.datasets[0].data = [data[0], data['0.01'], data['0.02'], data['0.03'], data['0.04'], data['0.05'], data['0.06']];
  }

  if (!data) {
    return (
      <div className="row align-items-end">
        <div
          className="col-xl-11 col-lg-10 col-md-10 col-sm-9 col-12 pr-sm-0 pr-3"
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300,
          }}
        >
          <Loading size={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="row align-items-end">
      <div className="col-xl-11 col-lg-10 col-md-10 col-sm-9 col-12 pr-sm-0 pr-3">
        <div className={classNames(styles.label, 'mb-1')}>Amount(LSP)</div>
        <Line
          type="line"
          width={100}
          height={50}
          data={chartData}
          options={options}
        />
      </div>
      <div className="col-xl-1 ol-lg-2 col-md-2 col-sm-3 col-12 mb-3 text-sm-left text-right">
        <div className={classNames(styles.label, 'mr-sm-0 mr-2')}>Price(XLM)</div>
      </div>
    </div>
  );
}
