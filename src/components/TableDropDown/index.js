import Image from 'next/image';
import DropDownToggle from 'assets/images/drop-down-toggle.svg';
import { useState } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

const index = ({ placeHolder, items, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)} className={styles['dropdown-container']}>
      {placeHolder}
      <Image className={styles['dropdown-icon']} src={DropDownToggle} width={10} height={10} />
      <div className={classNames(styles['dropdown-content'], isOpen && styles.active)}>
        {items?.map((item) => <div onClick={() => onChange(item)} className={styles['dropdown-item']}>{item}</div>)}
      </div>
    </div>
  );
};

export default index;
