import { openModalAction } from 'actions/modal';
import SelectPair from 'containers/obm/spot/SelectPair';
import classNames from 'classnames';
import { extractInfoByToken } from 'helpers/asset';
import { useDispatch } from 'react-redux';
import useDefaultTokens from 'hooks/useDefaultTokens';
import styles from './styles.module.scss';

export default function OpenDialogElement({
  className,
  appSpotPair,
  setAppSpotPair,
  createdDefaultPairs,
}) {
  const dispatch = useDispatch();
  const defaultTokens = useDefaultTokens();

  return (
    <div className={styles['container-select']}>
      <button
        type="button"
        className={classNames(styles['select-logo'], className)}
        onClick={() => {
          dispatch(
            openModalAction({
              modalProps: { title: 'Select a pair', className: `${styles.modal}` },
              content: <SelectPair
                createdDefaultPairs={createdDefaultPairs}
                setAppSpotPair={setAppSpotPair}
              />,
            }),
          );
        }}
      >
        <img className={styles['first-coin']} src={extractInfoByToken(appSpotPair.base, defaultTokens).logo} alt="" />
        <img className={styles['second-coin']} src={extractInfoByToken(appSpotPair.counter, defaultTokens).logo} alt="" />
        <h1>{appSpotPair.base.code}/{appSpotPair.counter.code}</h1>
        <span className="icon-angle-down ml-auto" />
      </button>
    </div>
  );
}
