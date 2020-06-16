import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import btcLogo from 'src/assets/images/btc-logo.png';
import ethLogo from 'src/assets/images/eth-logo.png';
import xlmLogo from 'src/assets/images/xlm-logo.png';
import styles from './styles.less';

const tokens = [
  { name: 'BTC', logo: btcLogo, web: 'amir.com' },
  { name: 'ETH', logo: ethLogo, web: 'apay.com' },
  { name: 'BTC', logo: btcLogo, web: 'amir.com' },
  { name: 'ETH', logo: ethLogo, web: 'apay.com' },
  { name: 'BTC', logo: btcLogo, web: 'amir.com' },
  { name: 'ETH', logo: ethLogo, web: 'apay.com' },
  { name: 'XLM', logo: xlmLogo, web: 'web.com' },
];

const TokenContent = (props) => {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    const results = tokens.filter((token) => token.name.toLowerCase().includes(searchString.toLowerCase()));
    setSearchResults(results);
  }, [searchString]);

  const item = (data) => (
    <div className="row justify-content-between mb-3 h-100 align-items-center">
      <div className={classNames(styles.crypto, 'col-auto')}>
        <img
          src={data.logo}
          alt="logo"
        />
        {data.name}
      </div>
      <div className={classNames('col-auto', styles.web)}>{data.web}</div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-12">
        <input
          type="text"
          className={classNames(styles.input, 'form-control primary-input')}
          value={searchString}
          onChange={(e) => { handleChange(e); }}
          placeholder="Search name or paste address"
        />
        {searchResults.map((token, index) => (
          <div key={index} className="mt-3 pt-2">
            {item(token)}
          </div>
        ))}
      </div>
    </div>
  );
};

TokenContent.propTypes = {

};

export default TokenContent;
