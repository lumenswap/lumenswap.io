import classNames from 'classnames';
import AddCustomPair from 'blocks/AddCustomPair';
import { closeModalAction, openModalAction } from 'actions/modal';
import defaultTokens from 'tokens/defaultTokens';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import XLM from 'tokens/XLM';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import USDC from 'tokens/USDC';
import questionLogo from 'assets/images/question.png';
import styles from './styles.module.scss';
import purePairs from './purePairs';

function createPairForDefaultTokens() {
  const result = [];

  for (const token of defaultTokens) {
    if (!isSameAsset(getAssetDetails(XLM), getAssetDetails(token))) {
      result.push({
        base: getAssetDetails(XLM),
        counter: getAssetDetails(token),
      });
    }
  }

  return result;
}

const SelectPair = ({ setAppSpotPair }) => {
  const customPairs = useSelector((state) => state.userCustomPairs);

  const enrichedPairs = useMemo(() => purePairs([
    {
      base: getAssetDetails(XLM),
      counter: getAssetDetails(USDC),
    },
    ...createPairForDefaultTokens(),
  ]).map((item) => {
    const foundBaseToken = defaultTokens
      .find((tok) => isSameAsset(getAssetDetails(tok), item.base));
    const foundCounterToken = defaultTokens
      .find((tok) => isSameAsset(getAssetDetails(tok), item.counter));

    let enrichedBaseToken;
    if (foundBaseToken) {
      enrichedBaseToken = {
        details: item.base,
        // web: foundBaseToken.web,
        logo: foundBaseToken.logo,
        type: 'default',
      };
    } else {
      enrichedBaseToken = {
        details: item.base,
        // web: minimizeAddress(item.base.getIssuer()),
        logo: questionLogo,
        type: 'custom',
      };
    }

    let enrichedCounterToken;
    if (foundCounterToken) {
      enrichedCounterToken = {
        details: item.counter,
        // web: foundCounterToken.web,
        logo: foundCounterToken.logo,
        type: 'default',
      };
    } else {
      enrichedCounterToken = {
        details: item.counter,
        // web: minimizeAddress(item.counter.getIssuer()),
        logo: questionLogo,
        type: 'custom',
      };
    }

    return {
      base: enrichedBaseToken,
      counter: enrichedCounterToken,
    };
  }), [JSON.stringify(customPairs)]);

  return (
    <div className={classNames('invisible-scroll', styles.scroll)}>
      {enrichedPairs.map((item, index) => (
        <div key={index}>
          <div
            className={styles['select-logo']}
            onClick={() => {
              setAppSpotPair({
                base: item.base.details,
                counter: item.counter.details,
              });

              closeModalAction();
            }}
          >
            <img src={item.base.logo} alt="baselogo" />
            <img src={item.counter.logo} alt="counterlogo" />
            {item.base.details.getCode()}/{item.counter.details.getCode()}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className={styles.submit}
        onClick={() => {
          openModalAction({
            modalProps: { title: 'Add custom pair' },
            content: <AddCustomPair />,
          });
        }}
      >
        <span
          className="icon-plus-circle mr-2"
        />
        Add custom pair
      </button>
    </div>
  );
};

export default SelectPair;
