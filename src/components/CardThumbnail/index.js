import { useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import Logo from 'assets/images/logo';

import styles from './styles.module.scss';

const CardThumbnail = ({
  name, imgSrc, price, onClick,
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
    <div
      className={styles.card}
      ref={divRef}
      onClick={onClick}
      style={onClick && { cursor: 'pointer' }}
    >
      <div className={styles.title}>#{name}</div>
      <div className={styles.img}>
        <Image src={imgSrc} width={dimensions.size} height={dimensions.size} />
      </div>
      <div className={styles.value}>
        <Logo />
        {price}
      </div>
    </div>
  );
};

CardThumbnail.defaultProps = {
  onClick: null,
};

CardThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.any.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CardThumbnail;
