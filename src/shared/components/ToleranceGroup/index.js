import React, { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

const ToleranceGroup = ({ values, defaultIndex }) => {
  const [active, setActive] = useState(defaultIndex);
  useEffect(() => {
    setActive(defaultIndex);
  }, [defaultIndex]);
  return (
    <div className="d-flex mt-2">
      {values.map((item, index) => (
        <Fragment key={index}>
          {item.value !== 'custom'
            ? (
              <button
                type="button"
                onClick={() => { setActive(index); console.warn(active); }}
                className={classNames((index === active) && styles.active, styles.btn)}
              >{item.value}%
              </button>
            )
            : (
              <div className={classNames('input-group mb-0 d-flex', styles.group)}>
                <div className={classNames('input-group-prepend', styles['input-name'])}>
                  <div className="input-group-text">Custom</div>
                </div>
                <input
                  type="number"
                  className="form-control"
                  onClick={() => setActive(4)}
                />
                <div className={classNames('input-group-prepend', styles.percentage)}>
                  <div className="input-group-text">%</div>
                </div>
              </div>
            )}
        </Fragment>
      ))}
    </div>
  );
};

export default ToleranceGroup;
