import { useState } from 'react';
import Input from 'components/Input';
import styles from './styles.module.scss';
import generateBridgeAssetLogo from '../generateAssetLogo';

const SelectAsset = ({ onSelectAsset, assets }) => {
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSetSearchQuery = () => (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  let filteredAssets = assets;
  if (searchQuery && searchQuery !== '') {
    filteredAssets = assets.filter((asset) => asset.name.toLowerCase()
      .search(searchQuery.toLowerCase()) !== -1);
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Search asset"
        className={styles.input}
        onChange={handleSetSearchQuery()}
      />
      <ul className={styles.list}>
        {filteredAssets.map((asset) => (
          <li key={asset.id} onClick={onSelectAsset(asset)}>
            <img
              src={generateBridgeAssetLogo(asset)}
              width={24}
              height={24}
              alt="assetImage"
            />
            <div>{asset.name}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SelectAsset;
