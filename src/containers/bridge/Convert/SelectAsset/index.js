import { useEffect, useState } from 'react';
import Input from 'components/Input';
import questionLogo from 'assets/images/question.png';

import { getAllBridgeTokens } from 'api/mockAPI/bridgeTokens';
import Loading from 'components/Loading';
import styles from './styles.module.scss';

const LoadingWithContainer = () => (
  <div className={styles['loading-container']}>
    <Loading size={40} />
  </div>
);

const SelectAsset = ({ onSelectAsset }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [tokens, setTokens] = useState(null);

  const handleSetSearchQuery = () => (e) => {
    setTimeout(() => {
      setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
    }, 700);
  };

  useEffect(() => {
    setTokens(null);
    const query = searchQuery ? { searchQuery } : null;
    if (query) {
      getAllBridgeTokens(query).then((recivedTokens) => {
        setTokens(recivedTokens);
      });
    } else {
      getAllBridgeTokens().then((recivedTokens) => {
        setTokens(recivedTokens);
      });
    }
  }, [searchQuery]);
  return (
    <>
      <Input
        type="text"
        placeholder="Search asset"
        className={styles.input}
        onChange={handleSetSearchQuery()}
      />
      <ul className={styles.list}>
        {tokens ? tokens.map((token) => (
          <li key={token.code} onClick={onSelectAsset(token)}>
            <img
              src={token.logo ?? questionLogo}
              width={24}
              height={24}
              alt="tokenImage"
            />
            <div>{token.code}</div>
          </li>
        )) : <LoadingWithContainer />}
      </ul>
    </>
  );
};

export default SelectAsset;
