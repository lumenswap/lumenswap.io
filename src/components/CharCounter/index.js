import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CharCounter = ({ char, length, show }) => {
  function renderCounter() {
    if (show) {
      return (
        <div className={styles.length}>
          <span>{char.length}</span>/{length}
        </div>
      );
    }
    return null;
  }
  return (
    <>
      {renderCounter()}
    </>
  );
};

CharCounter.propTypes = {
  char: PropTypes.any.isRequired,
  length: PropTypes.number.isRequired,
};

export default CharCounter;
