import PropTypes from 'prop-types';
import Image from 'next/image';

import styles from './styles.module.scss';

const CurrencyPair = ({ size, source }) => {
  const margin = size / 3;
  const imagesSize = (size * 2) - margin;
  return (
    <div className={styles.images} style={{ width: `${imagesSize}px` }}>
      <div className={styles.container}>
        <Image
          src={source[0]}
          width={size}
          height={size}
        />
      </div>
      <div className={styles.container} style={{ marginLeft: `-${margin}px` }}>
        <Image
          src={source[1]}
          width={size}
          height={size}
          alt="currency"
        />
      </div>
    </div>
  );
};

CurrencyPair.propTypes = {
  size: PropTypes.number.isRequired,
  source: PropTypes.array.isRequired,
};

export default CurrencyPair;
