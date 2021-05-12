import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const InputGroup = ({
  type, value, size, height, fontSize, disabled, placeholder,
  name, input, autoFocus, innerRef, onChange, rightLabel, leftLabel,
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
      onChange={onChange}
      {...input}
      style={{ height: `${height}px`, fontSize: `${fontSize}px` }}
    />
    <span className="input-group-text" style={{ height: `${height}px`, fontSize: `${fontSize}px` }}>{rightLabel}</span>
  </div>
);

InputGroup.defaultProps = {
  defaultValue: '',
  variant: '',
  disabled: false,
  placeholder: '',
  name: '',
  autoFocus: false,
  size: 'auto',
  fontSize: 14,
  height: 30,
};

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  fontSize: PropTypes.number,
  height: PropTypes.number,
};

export default InputGroup;
