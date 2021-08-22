import BN from 'helpers/BN';
import classNames from 'classnames';
import styles from './styles.module.scss';

const NumberOnlyInput = ({
  value, onChange, placeholder, className,
}) => {
  const handleInputChange = (e) => {
    e.preventDefault();
    const number = new BN(e.target.value);
    if (!number.isNaN()) {
      onChange(e.target.value);
    } else if (e.target.value === '') {
      onChange('');
    }
  };
  return (
    <input
      className={classNames(styles.input, className)}
      value={value || ''}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default NumberOnlyInput;
