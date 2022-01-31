import CharCounter from 'components/CharCounter';
import Input from 'components/Input';
import styles from '../styles.module.scss';

function Option({
  data,
}) {
  return (
    <div className={styles.group}>
      <div className="d-flex justify-content-between align-items-center">
        <label className="label-primary">Option {data.option.name}</label>
        <CharCounter length={50} char={data.props.value} show={data.option === data.show} />
      </div>
      <Input
        type="text"
        placeholder="Enter your address"
        height={40}
        fontSize={16}
        value={data.props.value}
        onChange={!data.option.defaultValue ? data.props.onChange : () => {}}
        maxLength={50}
        onFocus={() => { data.setShow(data.option); }}
        onBlur={() => { data.setShow(null); }}
        className={data.option.defaultValue && styles.defaultInput}
      />
    </div>
  );
}

export default Option;
