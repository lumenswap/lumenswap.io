import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CharCounter = ({ char, length }) => (
  <>
    {char
        && (
        <div className={styles.length}>
          <span>{char.length}</span>/{length}
        </div>
        )}
  </>
);

CharCounter.propTypes = {
  char: PropTypes.any.isRequired,
  length: PropTypes.number.isRequired,
};

export default CharCounter;
