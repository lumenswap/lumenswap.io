import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import CTable from 'components/CTable';
import numeral from 'numeral';
import urlMaker from 'helpers/urlMaker';
import defaultTokens from 'tokens/defaultTokens';
import minimizeAddress from 'helpers/minimizeAddress';
import { useSelector, useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import Image from 'next/image';
import CStatistics, { Info } from 'components/CStatistics';
import { useEffect, useState } from 'react';
import SendAsset from 'blocks/SendAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import BN from 'helpers/BN';
import Link from 'next/link';
import XLM from 'tokens/XLM';
import { fetchXLMPrice } from 'api/stellar';
import { calculateMaxXLM } from 'helpers/XLMValidator';
import questionLogo from 'assets/images/question.svg';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>There is no asset</div>
  </div>
);

function WalletData() {
  const userBalances = useSelector((state) => state.userBalance);
  const hashedUserBalance = userBalances.reduce((acc, value) => {
    acc[value.asset.code] = value;
    return acc;
  }, {});
  const [allBalances, setAllBalances] = useState(null);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterZeroBalance, setFilterZeroBalance] = useState(true);
  const [xlmPrice, setXLMPrice] = useState(null);

  const xlmBalance = userBalances.find((i) => isSameAsset(getAssetDetails(XLM), i.asset));
  const userSubentry = useSelector((state) => state.user.detail.subentry);

  useEffect(() => {
    if (userBalances.length > 0) {
      const allBalancesExceptUserBalance = defaultTokens.filter(
        (token) => !hashedUserBalance[token.code] && token,
      );
      const mappedBalances = allBalancesExceptUserBalance.map((token) => ({
        asset: getAssetDetails(token),
        balance: 0,
      }));
      const unsortedAllBalances = [...userBalances, ...mappedBalances];

      unsortedAllBalances.sort((a, b) => b.balance - a.balance);

      setAllBalances(unsortedAllBalances);
    }
  }, [userBalances]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };
  const handleCheckbox = () => {
    setFilterZeroBalance((prev) => !prev);
  };

  useEffect(() => {
    fetchXLMPrice().then((res) => {
      setXLMPrice(res.toFixed(7));
    });
  }, []);

  const reservedBalance = new BN(xlmBalance?.balance)
    .minus(calculateMaxXLM(xlmBalance?.balance, userSubentry))
    .toFixed(7);

  const statisticBlocks = [
    {
      title: 'XLM balance',
      tooltip: 'This shows your XLM balance',
      content: (
        <Info
          text="XLM"
          number={numeral(xlmBalance?.balance).format('0,0.[0000]')}
        />
      ),
      subtitle: (
        <span className={styles['info-content']}>
          {xlmPrice
            ? `$${numeral(
              new BN(xlmPrice).times(xlmBalance?.balance).toFixed(7),
            ).format('0,0.[0000]')}`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Reserved balance',
      tooltip: 'This shows your reserved balance, which includes your active offers and trust lines',
      content: (
        <Info
          text="XLM"
          number={numeral(reservedBalance).format('0,0.[0000]')}
        />
      ),
      subtitle: (
        <span className={styles['info-content']}>
          {xlmPrice
            ? `$${numeral(
              new BN(xlmPrice).times(reservedBalance).toFixed(7),
            ).format('0,0.[0000]')}`
            : '-'}
        </span>
      ),
    },
  ];

  const tableHeaders = [
    {
      title: 'Assets',
      dataIndex: 'assets',
      key: '1',
      render: (data) => {
        const token = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.asset));
        let logoSrc;
        let assetInfo;
        if (token) {
          logoSrc = token.logo;
          assetInfo = token.web;
        } else {
          assetInfo = minimizeAddress(data.asset.issuer);
          logoSrc = questionLogo;
        }

        return (
          <div className={styles.asset}>
            <div className={styles['asset-logo']}>
              <Image src={logoSrc} width="100%" height="100%" />
            </div>
            <div className={styles['asset-div']}>
              <span className={styles['asset-code']}>{data.asset.code}</span>
              <span className={styles['asset-info']}>{assetInfo}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: '2',
      sortFunc: (a, b, order) => (order === 'asc' ? a.balance - b.balance : b.balance - a.balance),
      render: (data) => (
        <span>{humanAmount(data.balance)}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: '3',
      render: (data) => (
        <div className={styles.actions}>
          <Link href={urlMaker.ammswap.custom('XLM', null, data.asset.code, data.asset.issuer)}>
            <a className={styles.link}>Swap</a>
          </Link>
          {new BN(data.balance).isEqualTo('0') ? (
            <div className={styles['disabled-send']}>Send</div>
          ) : (
            <span
              className={styles.send}
              onClick={() => {
                dispatch(
                  openModalAction({
                    modalProps: {
                      title: 'Send Asset',
                    },
                    content: <SendAsset selectedAsset={data.asset} />,
                  }),
                );
              }}
            >
              Send
            </span>
          )}
        </div>
      ),
    },
  ];

  let filteredBalances = allBalances?.map((item) => ({
    ...item,
    key: `${item.asset.code}:${item.asset.issuer}`,
  }));
  if (filterZeroBalance) {
    filteredBalances = filteredBalances?.filter(
      (balance) => !new BN(balance.balance).isEqualTo('0'),
    ).map((item) => ({
      ...item,
      key: `${item.asset.code}:${item.asset.issuer}`,
    }));
  }
  if (searchQuery) {
    filteredBalances = filteredBalances?.filter(
      (balance) => balance.asset.code
        .toLowerCase()
        .search(searchQuery.toLocaleLowerCase()) !== -1,
    ).map((item) => ({
      ...item,
      key: `${item.asset.code}:${item.asset.issuer}`,
    }));
  }

  return (
    <>
      <div className={styles.info}>
        <CStatistics blocks={statisticBlocks} />
      </div>
      <div className={styles['table-container']}>
        <div className={styles['search-box']}>
          <div className={styles.input}>
            <Input
              type="text"
              name="asset"
              id="asset"
              placeholder="Search assets"
              onChange={handleSearch}
              height={40}
              fontSize={15}
            />
          </div>
          <div className={styles.checkbox}>
            <Checkbox
              value={filterZeroBalance}
              onChange={handleCheckbox}
              size={20}
              fontSize={14}
              label="Hide zero balances"
            />
          </div>
        </div>
        <CTable
          columns={tableHeaders}
          dataSource={filteredBalances}
          className={styles.table}
          noDataMessage={NoDataMessage}
        />
      </div>
    </>
  );
}

export default WalletData;
