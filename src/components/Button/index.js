import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Button = ({
  disabled, content = '', variant, size, fontSize, htmlType, onClick, className, fontWeight = 'normal', children,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={htmlType || 'button'}
    disabled={disabled}
    className={classNames(styles[`button-${variant}`], className, styles.btn)}
    onClick={onClick}
    style={{ width: `${size}`, fontSize: `${fontSize}px`, fontWeight: `${fontWeight}` }}
  >
    {children || content}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  htmlType: 'button',
  size: '',
  fontSize: 16,
  className: '',
};

Button.propTypes = {
  disabled: PropTypes.bool,
  variant: PropTypes.string.isRequired,
  size: PropTypes.string,
  htmlType: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  fontSize: PropTypes.number,
};

export default Button;
