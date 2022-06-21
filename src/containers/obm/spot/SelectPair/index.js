import classNames from 'classnames';
import AddCustomPair from 'containers/obm/spot/SelectPair/AddCustomPair';
import { closeModalAction, openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { removeCustomPairAction } from 'actions/userCustomPairs';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import styles from './styles.module.scss';

const SelectPair = ({ setAppSpotPair, createdDefaultPairs }) => {
  const customPairs = useSelector((state) => state.userCustomPairs);
  const [searchQuery, setSearchQuery] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const enrichedPairs = useMemo(() => {
    let tokenPairs = [...createdDefaultPairs];
    if (customPairs !== []) {
      tokenPairs = [...tokenPairs, ...customPairs];
    }

    if (searchQuery && searchQuery !== '') {
      tokenPairs = tokenPairs.filter((pair) => {
        const modified = searchQuery.trim().toLowerCase();
        return `${pair.base.code.toLowerCase()}/${pair.counter.code.toLowerCase()}`.match(modified);
      });
    }
    return tokenPairs;
  },
  [JSON.stringify(customPairs), searchQuery]);

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
                    base: item.base,
                    counter: item.counter,
                  });
                  router.push(
                    urlMaker.obm.spot.custom(
                      item.base.code,
                      item.base.issuer,
                      item.counter.code,
                      item.counter.issuer,
                    ),
                  );

                  dispatch(closeModalAction());
                }}
              >
                <img src={item.base.logo} alt="baselogo" />
                <img src={item.counter.logo} alt="counterlogo" />
                <span>
                  {item.base.code}/{item.counter.code}
                </span>
                {(item.base.type === 'custom'
                  || item.counter.type === 'custom') && (
                  <span
                    style={{ marginLeft: 4 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        removeCustomPairAction({
                          base: item.base,
                          counter: item.counter,
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
