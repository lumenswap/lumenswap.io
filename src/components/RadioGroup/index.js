import styles from './styles.module.scss';

const RadioGroup = ({
  value, onUpdate, options, name,
}) => {
  const onChange = (e) => {
    onUpdate(e.target.value);
  };

  return (
    <div className={styles['radio-group']}>
      {options.map((item) => (
        <label key={item.value}>
          <input
            type="radio"
            checked={value.toString() === item.value.toString()}
            disabled={item.disabled}
            value={item.value}
            name={name}
            onChange={onChange}
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
