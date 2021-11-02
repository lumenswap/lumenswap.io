import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import QuestionIcon from 'assets/images/question-icon.png';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import styles from './style.module.scss';

const toleranceItems = ['0.1', '0.5'];

const Tolerance = ({ onChange, selected }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  function handleSelect(item) {
    setSelectedValue(item);
    onChange(item);
  }

  return (
    <div className="d-flex justify-content-between mt-3">
      <span
        className={classNames(styles.tolerance, 'd-flex align-items-center')}
      >
        Tolerance
        <Tooltips
          placement="top"
          id="price"
          text={<PrimaryTooltip text="test" />}
        >
          <span style={{ marginLeft: 2, height: 18 }}>
            <Image src={QuestionIcon} width={16} height={16} />
          </span>
        </Tooltips>
      </span>

      <div className={styles['tolerance-items']}>
        {!selected && (
          <>
            {toleranceItems.map((item) => (
              <span
                className={selectedValue === item ? styles.selected : ''}
                onClick={() => handleSelect(item)}
              >
                {item}%
              </span>
            ))}
            <span
              className={selectedValue === 'custom' ? styles.selected : ''}
              onClick={() => handleSelect('custom')}
            >
              Custom <span>%</span>
            </span>
          </>
        )}

        {selected && <span className={styles.selected}>{selected}%</span>}
      </div>
    </div>
  );
};

export default Tolerance;
