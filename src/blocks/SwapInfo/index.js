import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tooltips from 'components/Tooltip';
import styles from './styles.module.scss';

const SwapInfo = ({
  info: {
    minimum, price, tolerance, path,
  }, setTolerance, setInput, children,
}) => {
  const [active, setActive] = useState(0);
  const isActive = (index) => ((active === index) ? 'active' : '');

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.label}>Minimum received
          <Tooltips id="minimum" text="helooo1"><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles.info}>{minimum}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Price spread
          <Tooltips id="price" text="helooo2"><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles.info}>{price}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Slippage tolerance
          <Tooltips id="tolerance" text="helooo3"><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles['button-group']}>
          {tolerance.slice(0, tolerance.length + 1).map((item, index) => (
            <button
              type="button"
              key={index}
              className={classNames(isActive(index))}
              onClick={() => { setActive(index); setTolerance(tolerance[index]); setInput('custom', ''); }}
            >{tolerance[index]}%
            </button>
          ))}
          <button
            type="button"
            className={classNames(isActive(2), styles.custom)}
            onClick={() => { setActive(2); setTolerance(null); }}
          >
            custom
            {children}
            %
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Path
          <Tooltips id="path" text="helooo4"><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles.path}>
          {path.map((item, index) => (
            <div className={styles['path-container']} key={index}>
              <span>{item.toUpperCase()}</span>
              <span className="icon-arrow-right" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SwapInfo.propTypes = {
  info: PropTypes.object.isRequired,
};

export default SwapInfo;
