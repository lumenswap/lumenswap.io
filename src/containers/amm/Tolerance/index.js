import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import QuestionIcon from 'assets/images/question-icon.png';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import BN from 'helpers/BN';
import styles from './style.module.scss';

const toleranceItems = ['0.1', '0.5'];

const Tolerance = ({ onChange, value }) => {
  const [activeInput, setActiveInput] = useState(null);

  function handleFixedInput(index) {
    setActiveInput(index);
    onChange(toleranceItems[index]);
  }

  function handleCustomInput() {
    setActiveInput(toleranceItems.length);
    onChange(value);
  }

  useEffect(() => {
    setActiveInput(0);
  }, []);

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
        {toleranceItems.map((item, index) => (
          <span
            className={activeInput === index && styles.selected}
            onClick={() => handleFixedInput(index)}
          >
            {item}%
          </span>
        ))}
        <span
          className={classNames(
            activeInput === toleranceItems.length && styles.selected,
            styles.custom,
          )}
          onClick={() => handleCustomInput()}
        >
          <input
            name="custom"
            placeholder="custom"
            value={activeInput !== toleranceItems.length ? '' : value}
            onChange={(e) => {
              e.preventDefault();

              const number = new BN(e.target.value);
              if (!number.isNaN()) {
                onChange(e.target.value);
              } else if (e.target.value === '') {
                onChange(null);
              }
            }}
          />
          %
        </span>
      </div>
    </div>
  );
};

export default Tolerance;
