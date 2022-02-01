import CharCounter from 'components/CharCounter';
import styles from './styles.module.scss';

function CreateProposalTextArea({
  props, show, setShow, handleFocus,
}) {
  return (
    <div className="d-flex flex-column mb-4">
      <div className={styles['text-area-container']}>
        <textarea
          className={styles.textarea}
          placeholder="Tell more about your proposal (optional)"
          value={props.value}
          onChange={props.onChange}
          maxLength={500}
          onFocus={() => { handleFocus(props.name); }}
          onBlur={() => { setShow(null); }}
        />
        <div className="text-right mt-2">
          {props.name === show && <CharCounter length={500} char={props.value} />}
        </div>
      </div>
    </div>
  );
}

export default CreateProposalTextArea;
