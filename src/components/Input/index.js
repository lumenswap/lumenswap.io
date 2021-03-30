import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Input = ({
  type, value, size, height, fontSize, disabled, placeholder,
  name, input, autoFocus, innerRef,
}) => (
  <input
    type={type}
    className={styles.input}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    style={{ width: `${size}`, fontSize: `${fontSize}px`, height: `${height}px` }}
    name={name}
    ref={innerRef}
    autoFocus={autoFocus}
    {...input}
  />
);

Input.defaultProps = {
  defaultValue: '',
  variant: '',
  disabled: false,
  placeholder: '',
  name: '',
  autoFocus: false,
  size: '100%',
  fontSize: 20,
  height: 48,
};

Input.propTypes = {
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

export default Input;
