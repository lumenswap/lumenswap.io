import classNames from 'classnames';
import InputElement from './InputTextElement';
import InputElementText from './InputElement';
import styles from './styles.module.scss';

const InputGroup = (props) => (
  <>
    {props.variant === 'primary'
      ? (
        <div
          className={classNames('input-group', styles['input-group'])}
          style={{ width: `${props.size}`, fontSize: `${props.fontSize}px` }}
        >
          <InputElement {...props} />
          <InputElementText {...props} text={props.rightLabel} />
        </div>
      )
      : (
        <div
          className={classNames('input-group', styles['input-group-advance'])}
          style={{ width: `${props.size}`, fontSize: `${props.fontSize}px` }}
        >
          <InputElementText {...props} text={props.leftLabel} />
          <InputElement {...props} />
          <InputElementText {...props} text={props.rightLabel} />
        </div>
      )}
  </>
);

export default InputGroup;
