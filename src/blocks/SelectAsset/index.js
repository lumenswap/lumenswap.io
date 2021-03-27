import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import isEmpty from 'helpers/is-empty';
import defaultTokens from 'tokens/defaultTokens';
import styles from './styles.module.scss';

const SelectAsset = ({ setShow, setCurrency }) => {
  const [assets, setAssets] = useState(defaultTokens);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    if (!isEmpty(searchQuery)) {
      const modified = searchQuery.trim().toLowerCase();
      const formatted = assets.filter((i) => i.name.toLowerCase().match(modified));
      setAssets(formatted);
    } else {
      setAssets(defaultTokens);
    }
  }, [searchQuery]);

  function selectAsset(asset) {
    setCurrency(asset);
    setShow(false);
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
      />
      <div className={classNames('invisible-scroll', styles.scroll)}>
        {assets.map((asset) => (
          <div className={styles.box} key={`${asset.code}-${asset.issuer}`} onClick={() => selectAsset(asset)}>
            <div className="d-flex align-items-center">
              {asset.logo ? <img src={asset.logo} alt="logo" width={22} height={22} />
                : <div className={styles.circle}><span className="icon-question-circle" /></div>}
              <div className={styles.info}>
                <h6 className={styles.text}>{asset.code}</h6>
                <p className={styles.desc}>{asset.web}</p>
              </div>
            </div>
            <div className={styles.text}>{asset.value}</div>
          </div>
        ))}
      </div>
      <button type="submit" className={styles.submit}>
        <span className="icon-plus-circle mr-2" />Add custom asset
      </button>
    </div>
  );
};

export default SelectAsset;
