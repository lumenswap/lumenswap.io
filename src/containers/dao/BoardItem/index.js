import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button';
import LgBoard from './LgBoard';
import MdBoard from './MdBoard';

import styles from './styles.module.scss';

const BoardItem = ({ item, size }) => {
  const [toggle, setToggle] = useState(false);
  const onToggle = (ev) => { setToggle(!toggle); ev.stopPropagation(); };

  const renderButtons = () => {
    if (toggle) {
      return (
        <Button
          variant="basic"
          content="Joined"
          className={classNames(styles.btn, styles['btn-basic'])}
          onClick={onToggle}
        />
      );
    }
    return (
      <Button
        variant="primary"
        content="Join"
        className={styles.btn}
        onClick={onToggle}
      />
    );
  };

  return (
    <div>
      {size === 'lg' ? (
        <LgBoard
          item={item}
          button={renderButtons()}
        />
      ) : (
        <MdBoard
          item={item}
          button={renderButtons()}
        />
      )}
    </div>
  );
};

BoardItem.propTypes = {
  item: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
};

export default BoardItem;
