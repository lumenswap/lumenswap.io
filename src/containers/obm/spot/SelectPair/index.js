import classNames from 'classnames';
import AddCustomPair from 'containers/obm/spot/SelectPair/AddCustomPair';
import { closeModalAction, openModalAction } from 'actions/modal';
import defaultTokens from 'tokens/defaultTokens';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import XLM from 'tokens/XLM';
import {
  isSameAsset, getAssetDetails, isSamePair, extractInfoByToken,
} from 'helpers/asset';
import USDC from 'tokens/USDC';
import { removeCustomPairAction } from 'actions/userCustomPairs';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import styles from './styles.module.scss';
import purePairs from './purePairs';
import createPairForDefaultTokens from './createPairForDefaultTokens';

const createdDefaultPairs = createPairForDefaultTokens();

const SelectPair = ({ setAppSpotPair }) => {
  const customPairs = useSelector((state) => state.userCustomPairs);
  const [searchQuery, setSearchQuery] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const enrichedPairs = useMemo(() => {
    const result = purePairs([
      {
        base: getAssetDetails(XLM),
        counter: getAssetDetails(USDC),
      },
      ...createdDefaultPairs,
      ...customPairs,
    ]).map((item) => {
      const foundBaseToken = defaultTokens
        .find((tok) => isSameAsset(getAssetDetails(tok), item.base));
      const foundCounterToken = defaultTokens
        .find((tok) => isSameAsset(getAssetDetails(tok), item.counter));

      let enrichedBaseToken = {
        details: item.base,
        // web: foundBaseToken.web,
        logo: extractInfoByToken(item.base).logo,
        type: 'default',
      };
      if (!foundBaseToken) {
        enrichedBaseToken = {
          ...enrichedBaseToken,
          type: 'custom',
        };
      }

      let enrichedCounterToken = {
        details: item.counter,
        // web: foundCounterToken.web,
        logo: extractInfoByToken(item.counter).logo,
        type: 'default',
      };
      if (!foundCounterToken) {
        enrichedCounterToken = {
          ...enrichedCounterToken,
          type: 'custom',
        };
      }

      const richedAssets = {
        base: enrichedBaseToken,
        counter: enrichedCounterToken,
      };

      if (
        createdDefaultPairs.find((i) => isSamePair(i, {
          base: richedAssets.base.details,
          counter: richedAssets.counter.details,
        }))
      ) {
        return richedAssets;
      }
      return {
        base: {
          ...richedAssets.base,
          type: 'custom',
        },
        counter: {
          ...richedAssets.counter,
          type: 'custom',
        },
      };
    });

    if (searchQuery && searchQuery !== '') {
      return result.filter((item) => {
        const modified = searchQuery.trim().toLowerCase();
        return `${item.base.details
          .getCode()
          .toLowerCase()}/${item.counter.details
          .getCode()
          .toLowerCase()}`.match(modified);
      });
    }

    return result;
  }, [JSON.stringify(customPairs), searchQuery]);

  return (
    <div className={styles.main} style={{ paddingBottom: 50 }}>
      <Input
        type="text"
        placeholder="Search asset pair"
        name="search"
        fontSize={14}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        autoFocus
      />
      <div className={classNames('invisible-scroll', styles.scroll)}>
        {enrichedPairs.length === 0 ? (
          <p style={{ padding: 16 }}>There is no asset pair</p>
        ) : (
          enrichedPairs.map((item, index) => (
            <div className={styles.item} key={index}>
              <div
                className={styles['select-logo']}
                onClick={() => {
                  setAppSpotPair({
                    base: item.base.details,
                    counter: item.counter.details,
                  });
                  const found = customPairs.find(
                    (pair) => pair.base.code === item.base.details.code
                      && pair.counter.code === item.counter.details.code,
                  );
                  if (found) {
                    router.push(
                      urlMaker.obm.spot.custom(
                        item.base.details.code,
                        item.base.details.issuer,
                        item.counter.details.code,
                        item.counter.details.issuer,
                      ),
                    );
                  } else {
                    router.push(
                      urlMaker.obm.spot.custom(
                        item.base.details.code,
                        item.base.details.issuer,
                        item.counter.details.code,
                        item.counter.details.issuer,
                      ),
                    );
                  }
                  dispatch(closeModalAction());
                }}
              >
                <img src={item.base.logo} alt="baselogo" />
                <img src={item.counter.logo} alt="counterlogo" />
                <span>
                  {item.base.details.getCode()}/{item.counter.details.getCode()}
                </span>
                {(item.base.type === 'custom'
                  || item.counter.type === 'custom') && (
                  <span
                    style={{ marginLeft: 4 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        removeCustomPairAction({
                          base: item.base.details,
                          counter: item.counter.details,
                        }),
                      );
                    }}
                  >
                    (delete)
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        <button
          type="submit"
          className={styles.submit}
          onClick={() => {
            dispatch(
              openModalAction({
                modalProps: { title: 'Add custom pair' },
                content: <AddCustomPair />,
              }),
            );
          }}
        >
          <span className="icon-plus-circle mr-2" />
          Add custom pair
        </button>
      </div>
    </div>
  );
};

export default SelectPair;
