import CharCounter from 'components/CharCounter';
import Input from 'components/Input';
import styles from '../styles.module.scss';

function Option({
  props,
  show,
  setShow,
  option,
}) {
  return (
    <div className={styles.group}>
      <div className="d-flex justify-content-between align-items-center">
        <label className="label-primary">Option {option.name}</label>
        {option === show && <CharCounter length={50} char={props.value} />}
      </div>
      <Input
        type="text"
        placeholder="Enter your address"
        height={40}
        fontSize={16}
        value={props.value}
        onChange={!option.defaultValue ? props.onChange : () => {}}
        maxLength={50}
        onFocus={() => { setShow(option); }}
        onBlur={() => { setShow(null); }}
        className={option.defaultValue && styles.defaultInput}
      />
    </div>
  );
}

export default Option;
