import CharCounter from 'components/CharCounter';
import styles from './styles.module.scss';

function CreateProposalTextArea({ data }) {
  return (
    <div className="d-flex flex-column mb-4">
      <div className={styles['text-area-container']}>
        <textarea
          className={styles.textarea}
          placeholder="Tell more about your proposal (optional)"
          value={data.props.value}
          onChange={data.props.onChange}
          maxLength={500}
          onFocus={() => { data.handleFocus(data.props.name); }}
          onBlur={() => { data.setShow(null); }}
        />
        <div className="text-right mt-2">
          <CharCounter length={500} char={data.props.value} show={data.props.name === data.show} />
        </div>
      </div>
    </div>
  );
}

export default CreateProposalTextArea;
