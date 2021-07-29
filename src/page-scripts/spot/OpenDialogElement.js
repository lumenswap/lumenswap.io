import { openModalAction } from 'actions/modal';
import SelectPair from 'blocks/SelectPair';
import classNames from 'classnames';
import questionLogo from 'assets/images/question.png';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import defaultTokens from 'tokens/defaultTokens';
import styles from './styles.module.scss';

export default function OpenDialogElement({
  className, appSpotPair, setAppSpotPair,
}) {
  const baseTokenLogo = defaultTokens
    .find((tok) => isSameAsset(getAssetDetails(tok), appSpotPair.base))?.logo || questionLogo;
  const counterTokenLogo = defaultTokens
    .find((tok) => isSameAsset(getAssetDetails(tok), appSpotPair.counter))?.logo || questionLogo;

  return (
    <div className={styles['container-select']}>
      <button
        type="button"
        className={classNames(styles['select-logo'], className)}
        onClick={() => {
          openModalAction({
            modalProps: { title: 'Select a pair' },
            content: <SelectPair
              setAppSpotPair={setAppSpotPair}
            />,
          });
        }}
      >
        <img className={styles['first-coin']} src={baseTokenLogo} alt="" />
        <img className={styles['second-coin']} src={counterTokenLogo} alt="" />
        {appSpotPair.base.getCode()}/{appSpotPair.counter.getCode()}
        <span className="icon-angle-down ml-auto" />
      </button>
    </div>
  );
}
