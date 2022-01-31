import CharCounter from 'components/CharCounter';
import styles from './styles.module.scss';

function CreateProposalInput({
  data,
}) {
  return (
    <div className="d-flex align-items-center mb-4">
      <input
        type="text"
        className={styles.input}
        placeholder="Ask a question…"
        value={data.props.value}
        onChange={data.props.onChange}
        maxLength={50}
        onFocus={() => { data.handleFocus(data.props.name); }}
        onBlur={() => { data.setShow(null); }}
      />
      <CharCounter length={50} char={data.props.value} show={data.props.name === data.show} />
    </div>
  );
}

export default CreateProposalInput;
