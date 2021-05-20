import React from 'react';
import classNames from 'classnames';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

const InputGroup = ({
  type, value, size, height, fontSize, disabled, placeholder,
  name, input, autoFocus, innerRef, onChange, rightLabel, leftLabel,
  onChangeInput,
}) => (
  <div
    className={classNames('input-group', styles['input-group'])}
    style={{ width: `${size}`, fontSize: `${fontSize}px` }}
  >
    <span className="input-group-text" style={{ height: `${height}px`, fontSize: `${fontSize}px` }}>{leftLabel}</span>
    <input
      type={type}
      className={classNames(styles.input, 'form-control')}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      ref={innerRef}
      autoFocus={autoFocus}
      onChange={(e) => {
        e.preventDefault();

        const number = new BN(e.target.value);
        if (!number.isNaN()) {
          onChange(e.target.value);
          onChangeInput(e.target.value);
        } else if (e.target.value === '') {
          onChange(null);
          onChangeInput(null);
        }
      }}
      {...input}
      style={{ height: `${height}px`, fontSize: `${fontSize}px` }}
    />
    <span className="input-group-text" style={{ height: `${height}px`, fontSize: `${fontSize}px` }}>{rightLabel}</span>
  </div>
);

export default InputGroup;
