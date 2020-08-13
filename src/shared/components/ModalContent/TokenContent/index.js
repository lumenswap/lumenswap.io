import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import defaultTokens from 'src/tokens/defaultTokens';
import CustomModal from 'src/shared/components/CustomModal';
import hideModal from 'src/actions/modal/hide';
import AddAssetContent from 'src/shared/components/ModalContent/AddAssetContent';
import styles from './styles.module.scss';

const TokenContent = ({ setToken, excludeToken, includeToken }) => {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modal, toggleModal] = useState(false);
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    const results = [...includeToken, ...defaultTokens].filter(
      (token) => token.code.toLowerCase().includes(searchString.toLowerCase()),
    );
    setSearchResults(results);
  }, [includeToken, searchString]);

  const item = (data) => (
    <div className="row justify-content-between mb-3 h-100 align-items-center">
      <div className={classNames(styles.crypto, 'col-auto')}>
        <img
          src={data.logo}
          alt="logo"
        />
        {data.code}
      </div>
      <div className={classNames('col-auto', styles.web)}>{data.web}</div>
    </div>
  );

  return (
      <>
        <div className="row">
          <div className="col-auto">
            <input
                type="text"
                className={classNames(styles.input, 'form-control primary-input')}
                value={searchString}
                onChange={(e) => { handleChange(e); }}
                placeholder="Asset code"
            />
          </div>
          <div className="col-2 pl-0">
            <button
               type="button"
               className={styles.add}
               onClick={() => { toggleModal(true); }}
            >
              <span className="icon-more" />
            </button>
            <CustomModal
                toggle={toggleModal}
                modal={modal}
                marginTop={45}
                title="Add assets"
                modalSize="328"
            >
              <AddAssetContent/>
            </CustomModal>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className={classNames(styles.scroll, 'mt-3')} style={{ paddingRight: (searchResults.length > 5) && '4px' }}>
              {searchResults.map((token, index) => (
                  <div
                      key={index}
                      className={classNames((index === 0) ? 'pt-2' : 'mt-3 pt-2')}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (token.code === excludeToken.code && token.issuer === excludeToken.issuer) {
                          setToken(token, true);
                        } else {
                          setToken(token);
                        }
                        hideModal();
                      }}
                  >
                    {item(token)}
                  </div>
              ))}
            </div>
          </div>
        </div>
      </>
  );
};

export default TokenContent;
