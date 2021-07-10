// import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import BN from 'helpers/BN';
import styles from '../styles.module.scss';

const InputElement = ({
  type, value, height, fontSize, disabled, placeholder,
  input, autoFocus, onChange,
  onChangeInput = () => {},
}) => (
  <input
    type={type}
    className={classNames(styles.input, 'form-control')}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    autoFocus={autoFocus}
    onChange={(e) => {
      e.preventDefault();

      const number = new BN(e.target.value);
      if (!number.isNaN()) {
        onChange(e.target.value);
        onChangeInput(e.target.value);
      } else if (e.target.value === '') {
        onChange('');
        onChangeInput(0);
      }
    }}
    {...input}
    style={{ height: `${height}px`, fontSize: `${fontSize}px` }}
  />
);

export default InputElement;
