import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CharCounter = ({ char, length }) => (
  <div className={styles.length}>
    <span>{char?.length ?? 0}</span>/{length}
  </div>
);

CharCounter.propTypes = {
  char: PropTypes.any.isRequired,
  length: PropTypes.number.isRequired,
};

export default CharCounter;
