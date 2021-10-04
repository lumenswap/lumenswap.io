import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from './styles.module.scss';

const BasicList = ({ items, title }) => (
  <div>
    <div className={styles.title}>{title}</div>
    {items.map((item, index) => (
      <div key={index} className={styles.container}>
        <div className={styles.subject}>{item.subject}</div>
        <div className={styles.info}>
          {item.link
            ? (
              <Link href={item.link}>
                <a target={item.external ? '_blank' : '_self'}>
                  {item.info}
                  {item.external && <span className="icon-external" />}
                </a>
              </Link>
            )
            : item.info}
        </div>
      </div>
    ))}
  </div>
);

BasicList.defaultProps = {
  title: '',
};

BasicList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
};

export default BasicList;
