import React, { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

const ToleranceGroup = ({ values, defaultIndex, onChange }) => {
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
                onClick={() => { setActive(index); onChange(item.value); }}
                className={classNames((index === active) && styles.active, styles.btn)}
              >{item.value}%
              </button>
            )
            : (
              <div className={classNames('mb-0 d-flex', styles.group)}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="custom"
                  onClick={(val) => { setActive(4); onChange(val.currentTarget.value); }}
                  onChange={(val) => { onChange(val.currentTarget.value); }}
                />
                {/* <div className={classNames('input-group-prepend', styles.percentage)}> */}
                {/*  <div className="input-group-text">%</div> */}
                {/* </div> */}
              </div>
            )}
        </Fragment>
      ))}
    </div>
  );
};

export default ToleranceGroup;
