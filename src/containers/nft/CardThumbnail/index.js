import { useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';

import Logo from 'assets/images/logo';

import styles from './styles.module.scss';

const CardThumbnail = ({
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
            <Image src={imgSrc} width={dimensions.size} height={dimensions.size} />
          </div>
          <div className={styles.value}>
            <Logo />
            {numeral(price).format('0,0')}
          </div>
        </div>
      </a>
    </Link>
  );
};

CardThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.any.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default CardThumbnail;
