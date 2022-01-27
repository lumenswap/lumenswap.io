import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/Button';
import { getAssetDetails, isSameAsset } from 'helpers/asset';
import { openConnectModal } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import LgBoard from './LgBoard';
import MdBoard from './MdBoard';

import styles from './styles.module.scss';

const BoardItem = ({ item, size }) => {
  const dispatch = useDispatch();

  const userBalances = useSelector((state) => state.userBalance);
  const isLogged = useIsLogged();

  const onJoin = (ev) => {
    ev.preventDefault();
    if (!isLogged) {
      dispatch(openConnectModal());
    }
  };

  const foundInUserBalance = userBalances
    .find((i) => isSameAsset(getAssetDetails(item.asset), i.asset));

  const renderButtons = () => {
    if (foundInUserBalance) {
      return (
        <Button
          variant="basic"
          content="Joined"
          className={classNames(styles.btn, styles['btn-basic'])}
        />
      );
    }
    return (
      <Button
        variant="primary"
        content="Join"
        className={styles.btn}
        onClick={onJoin}
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
