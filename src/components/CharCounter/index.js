import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CharCounter = ({ char, length, show }) => {
  if (show) {
    return (
      <div className={styles.length}>
        <span>{char?.length ?? 0}</span>/{length}
      </div>
    );
  }

  return null;
};

CharCounter.propTypes = {
  char: PropTypes.any.isRequired,
  length: PropTypes.number.isRequired,
};

export default CharCounter;
