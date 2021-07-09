import BigNumber from 'bignumber.js';
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
        let toChange = e.target.value;
        if (toChange[toChange.length - 1] !== '.') {
          toChange = new BigNumber(toChange).toString();
        }

        onChange(toChange);
        onChangeInput(e.target.value);
      } else if (e.target.value === '') {
        onChange(0);
        onChangeInput(0);
      }
    }}
    {...input}
    style={{ height: `${height}px`, fontSize: `${fontSize}px` }}
  />
);

export default InputElement;
