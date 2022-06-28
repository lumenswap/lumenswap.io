import { useMemo, useState } from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import {
  getAssetDetails, isSameAsset, pureTokens,
} from 'helpers/asset';
import { useDispatch, useSelector } from 'react-redux';
import minimizeAddress from 'helpers/minimizeAddress';
import questionLogo from 'assets/images/question.png';
import humanizeAmount from 'helpers/humanizeAmount';
import { openModalAction } from 'actions/modal';
import AddAsset from 'components/complex/LumenSwapSwap/CurrencyInput/SelectAsset/AddAsset';
import { removeCustomTokenAction } from 'actions/userCustomTokens';
import useDefaultTokens from 'hooks/useDefaultTokens';
import styles from './styles.module.scss';

const SelectAsset = ({
  setShow,
  setCurrency,
  getFormValues,
  swapFromWithTo,
  changeToAsset,
  currentFrom,
  type,
}) => {
  const userBalance = useSelector((state) => state.userBalance);
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const [searchQuery, setSearchQuery] = useState(null);
  const isLogged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();
  const defaultTokens = useDefaultTokens();

  const enrichedTokens = useMemo(() => {
    const result = pureTokens([
      ...defaultTokens.filter((i) => !i.isHide).map((i) => getAssetDetails(i)),
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
        const modified = searchQuery.trim().toLowerCase().replace(new RegExp('\\\\', 'g'), '\\\\');
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
    const formValues = getFormValues();
    setShow(false);
    const fromAssetDetails = getAssetDetails(formValues.from.asset.details);
    let toAssetDetails = null;

    if (formValues.to?.asset?.details) {
      toAssetDetails = getAssetDetails(formValues.to.asset.details);
    }
    if (
      formValues.to.asset
      && (isSameAsset(fromAssetDetails, asset.details)
        || isSameAsset(toAssetDetails, asset.details))
    ) {
      swapFromWithTo();
    } else if (isSameAsset(fromAssetDetails, asset.details)) {
      swapFromWithTo();
    } else {
      setCurrency(asset);
    }
  }

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
          enrichedTokens.map((asset) => (
            <div
              className={styles.box}
              key={`${asset.details.getCode()}-${asset.details.getIssuer()}`}
              onClick={() => selectAsset(asset)}
            >
              <div className="d-flex align-items-center">
                {asset.logo ? (
                  <img src={asset.logo} alt="logo" width={22} height={22} />
                ) : (
                  <div className={styles.circle}>
                    <span className="icon-question-circle" />
                  </div>
                )}
                <div className={styles.info}>
                  <h6 className={styles.text}>
                    {asset.details.getCode()}
                    {asset.type === 'custom' && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeCustomTokenAction(asset.details));
                        }}
                      >
                        {' '}
                        (delete)
                      </span>
                    )}
                  </h6>
                  <p className={styles.desc}>{asset.web}</p>
                </div>
              </div>
              <div className={styles.text}>
                {isLogged && humanizeAmount(asset.balance)}
              </div>
            </div>
          ))
        )}
      </div>
      <button
        type="submit"
        className={styles.submit}
        onClick={() => {
          setShow(false);
          dispatch(
            openModalAction({
              modalProps: { title: 'Add custom asset' },
              content: (
                <AddAsset
                  currentFrom={currentFrom}
                  changeToAsset={changeToAsset}
                  type={type}
                />
              ),
            }),
          );
        }}
      >
        <span className="icon-plus-circle mr-2" />
        Add custom asset
      </button>
    </div>
  );
};

export default SelectAsset;
