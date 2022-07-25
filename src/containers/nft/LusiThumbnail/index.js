import { useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import BN from 'helpers/BN';
import Link from 'next/link';
import Logo from 'assets/images/logo';
import humanizeAmount from 'helpers/humanizeAmount';
import styles from './styles.module.scss';

const LusiThumbnail = ({
  name, imgSrc, price, url,
}) => {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ size: 180 });

  const handleResize = () => {
    if (divRef.current) {
      setDimensions({
        size: divRef.current.offsetWidth,
      });
    }
  };

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Link href={url}>
      <a className={styles['card-link']}>
        <div
          className={styles.card}
          ref={divRef}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.title}>#{name}</div>
          <div className={styles.img}>
            <img
              loading="lazy"
              src={imgSrc}
              style={{ width: `${dimensions.size - 12}px`, height: `${dimensions.size}px` }}
            />
          </div>
          <div className={styles.value}>
            {!new BN(price).isZero() ? (
              <>
                <Logo color="#DF4886" />
                <span>{humanizeAmount(new BN(price).div(10 ** 7).toFixed(7))}</span>
              </>
            ) : '- -'}
          </div>
        </div>
      </a>
    </Link>
  );
};

LusiThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.any.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default LusiThumbnail;
