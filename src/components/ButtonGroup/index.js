import { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const ButtonGroup = ({ buttons, activeIndex, setValue }) => {
  const [clickedId, setClickedId] = useState(activeIndex);

  const handleClick = (event, id) => {
    setClickedId(id);
    setValue(buttons[id].value);
  };

  return (
    <>
      {buttons.map((button, i) => (
        <button
          type="button"
          key={i}
          name={button.label}
          onClick={(event) => handleClick(event, i)}
          className={classNames(styles.button, (i === clickedId) && styles.active, (i === clickedId) && 'active')}
        >
          {button.label}
        </button>
      ))}
    </>
  );
};

export default ButtonGroup;
