import { useMemo, useState } from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import defaultTokens from 'tokens/defaultTokens';
import { getAssetDetails, isSameAsset, pureTokens } from 'helpers/asset';
import { useDispatch, useSelector } from 'react-redux';
import minimizeAddress from 'helpers/minimizeAddress';
import XLM from 'tokens/XLM';
import questionLogo from 'assets/images/question.png';
import CAddCustomToken from 'components/CAddCustomToken';
import { openModalAction, closeModalAction } from 'actions/modal';
import TokenItem from './TokenItem';
import styles from './styles.module.scss';

const CSelectToken = ({ onTokenSelect }) => {
  const userBalance = useSelector((state) => state.userBalance);
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const [searchQuery, setSearchQuery] = useState(null);
  const dispatch = useDispatch();

  const enrichedTokens = useMemo(() => {
    const result = pureTokens([
      getAssetDetails(XLM),
      ...defaultTokens.map((i) => getAssetDetails(i)),
      ...userCustomTokens,
    ]).map((item) => {
      const foundToken = defaultTokens.find((tok) => isSameAsset(getAssetDetails(tok), item));
      const foundBalance = userBalance.find((balance) => isSameAsset(balance.asset, item));

      if (foundToken) {
        return {
          details: item,
          web: foundToken.web,
          logo: foundToken.logo,
          balance: foundBalance ? foundBalance.balance : '0',
          type: 'default',
        };
      }

      return {
        details: item,
        web: minimizeAddress(item.getIssuer()),
        logo: questionLogo,
        balance: foundBalance ? foundBalance.balance : '0',
        type: 'custom',
      };
    });

    if (searchQuery && searchQuery !== '') {
      return result.filter((item) => {
        const modified = searchQuery.trim().toLowerCase();
        return item.details.getCode().toLowerCase().match(modified);
      });
    }

    return result;
  }, [
    JSON.stringify(userBalance),
    JSON.stringify(userCustomTokens),
    searchQuery,
  ]);

  function selectAsset(asset) {
    dispatch(closeModalAction());
    onTokenSelect(asset.details);
  }
  const handleAddCustomAsset = () => {
    dispatch(
      openModalAction({
        modalProps: { title: 'Add custom asset' },
        content: (
          <CAddCustomToken onAddToken={() => {
            dispatch(
              openModalAction({
                modalProps: { title: 'Select asset' },
                content: (
                  <CSelectToken onTokenSelect={onTokenSelect} />
                ),
              }),
            );
          }}
          />
        ),
      }),
    );
  };

  return (
    <div className={styles.container}>
      <Input
        type="text"
        placeholder="Search asset code"
        name="search"
        fontSize={14}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        autoFocus
      />
      <div className={classNames('invisible-scroll', styles.scroll)}>
        {enrichedTokens.length === 0 ? (
          <p style={{ padding: 16 }}>There is no asset</p>
        ) : (
          enrichedTokens.map((asset, index) => (
            <TokenItem
              key={index}
              selectAsset={selectAsset}
              asset={asset}
            />
          ))
        )}
      </div>
      <button
        type="submit"
        className={styles.submit}
        onClick={handleAddCustomAsset}
      >
        <span className="icon-plus-circle mr-2" />
        Add custom asset
      </button>
    </div>
  );
};

export default CSelectToken;
