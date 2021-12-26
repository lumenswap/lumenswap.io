import Image from 'next/image';
import DropDownToggle from 'assets/images/drop-down-toggle.svg';
import { useState } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

const TableDropDown = ({
  items, onChange, placeholder = 'All Tickets', defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultOption);

  function handleSelect(item) {
    onChange(item);
    setSelectedItem(item);
  }

  if (!items) {
    return (
      <div onClick={() => setIsOpen(!isOpen)} className={styles['dropdown-container']}>
        <div className={classNames(styles['dropdown-content'], isOpen && styles.active)} />
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      className={styles['dropdown-container']}
    >
      {selectedItem ? selectedItem.text : placeholder}
      <Image className={styles['dropdown-icon']} src={DropDownToggle} width={10} height={10} />
      <div className={classNames(styles['dropdown-content'], isOpen && styles.active)}>
        {items?.map((item, i) => (
          <div key={i} onClick={() => handleSelect(item)} className={styles['dropdown-item']}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableDropDown;
