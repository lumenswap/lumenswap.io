import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Input = ({
  type, defaultValue, variant, size, height, fontSize, disabled, placeholder, name, register, input, autoFocus,
}) => (
  <input
    type={type}
    className={styles.input}
    value={defaultValue}
    disabled={disabled}
    placeholder={placeholder}
    style={{ width: `${size}`, fontSize: `${fontSize}px`, height: `${height}px` }}
    name={name}
    ref={register}
    {...input}
    autoFocus={autoFocus}
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
