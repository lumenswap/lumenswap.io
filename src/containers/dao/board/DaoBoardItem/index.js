import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import classNames from 'classnames';

import Button from 'components/Button';

import styles from './styles.module.scss';

const DaoBoardItem = ({ item }) => {
  const [toggle, setToggle] = useState(false);
  const {
    logo, name, desc, proposals, member, tiker,
  } = item;

  const onToggle = () => setToggle(!toggle);

  return (
    <div className={styles.item}>
      <div className="px-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className={styles.img}>
            <Image src={logo} width={40} height={40} alt={name} />
          </div>
          <div>
            {toggle ? (
              <Button
                variant="basic"
                content="Joined"
                className={classNames(styles.btn, styles['btn-basic'])}
                onClick={onToggle}
              />
            ) : (
              <Button
                variant="primary"
                content="Join"
                className={styles.btn}
                onClick={onToggle}
              />
            )}
          </div>
        </div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.para}>{desc}</p>
        <div className={styles.proposal}>
          <div className={styles.badge}>{proposals}</div>
          Active proposal
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles['info-col']}>
          <div className={styles.value}>{member}</div>
          <div className={styles.subject}>Comminuty member</div>
        </div>
        <div className={styles['info-col']}>
          <div className={styles.value}>{tiker}</div>
          <div className={styles.subject}>Tiker</div>
        </div>
      </div>
    </div>
  );
};

DaoBoardItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default DaoBoardItem;
