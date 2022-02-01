import CharCounter from 'components/CharCounter';
import styles from './styles.module.scss';

function CreateProposalInput({
  show, setShow, handleFocus, props,
}) {
  return (
    <div className="d-flex align-items-center mb-4">
      <input
        type="text"
        className={styles.input}
        placeholder="Ask a question…"
        value={props.value}
        onChange={props.onChange}
        maxLength={50}
        onFocus={() => { handleFocus(props.name); }}
        onBlur={() => { setShow(null); }}
      />
      {props.name === show && <CharCounter length={50} char={props.value} />}
    </div>
  );
}

export default CreateProposalInput;
