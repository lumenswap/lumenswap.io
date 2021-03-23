import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import Input from 'components/Input';
import logo from 'assets/images/btc-logo.png';
import isEmpty from 'helpers/is-empty';
import styles from './styles.module.scss';

const assetsData = [
  {
    logo, name: 'BTC', web: 'amir.com', value: '4',
  },
  {
    logo: '', name: 'ETH', web: 'ethco.com', value: '12',
  },
  {
    logo, name: 'XLM', web: 'amir.com', value: '14,456',
  },
  {
    logo, name: 'BTC', web: 'amir.com', value: '4',
  },
  {
    logo: '', name: 'ETH', web: 'ethco.com', value: '12',
  },
  {
    logo, name: 'XLM', web: 'amir.com', value: '14,456',
  },
  {
    logo, name: 'XLM', web: 'amir.com', value: '4',
  },
  {
    logo, name: 'XLM', web: 'amir.com', value: '4',
  },
];

const SelectAsset = () => {
  const { register, watch } = useForm();
  const [assets, setAssets] = useState(assetsData);

  let searchString = watch('search');

  useEffect(() => {
    if (!isEmpty(searchString)) {
      searchString = searchString.trim().toLowerCase();
      const formatted = assets.filter((i) => i.name.toLowerCase().match(searchString));
      setAssets(formatted);
    } else {
      setAssets(assetsData);
    }
  }, [searchString]);

  return (
    <div className={styles.container}>
      <form>
        <Input type="text" placeholder="Search asset code" name="search" register={register} fontSize={14} />
        <div className={classNames('invisible-scroll', styles.scroll)}>
          {assets.map((asset, index) => (
            <div className={styles.box} key={index}>
              <div className="d-flex align-items-center">
                {asset.logo ? <img src={asset.logo} alt="logo" width={22} height={22} />
                  : <div className={styles.circle}><span className="icon-question-circle" /></div>}
                <div className={styles.info}>
                  <h6 className={styles.text}>{asset.name}</h6>
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
      </form>
    </div>
  );
};

export default SelectAsset;
