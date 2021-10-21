import { useState } from 'react';
import Image from 'next/image';
import { openConnectModal, openModalAction } from 'actions/modal';
import classNames from 'classnames';
import LotteryHead from 'containers/lottery/LotteryHead';
import Button from 'components/Button';
import Link from 'next/link';
import ArrowIcon from 'assets/images/arrow-right-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginTypes } from 'reducers/user';
import urlMaker from 'helpers/urlMaker';
import BreadCrump from 'components/BreadCrumb';
import BuyTicketSingle from './BuyTicketSingle';
import BuyTicketPrivateKey from './BuyTicketPrivateKey';
import BoardData from './BoardData';
import RoundPrize from './RoundPrize';
import RoundInfo from './RoundInfo';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';

const RoundDetailsPage = ({ round }) => {
  const [tab, setTab] = useState('tickets');
  const isLogged = useSelector((state) => state.user.logged);
  const loginType = useSelector((state) => state.user.loginType);
  const dispatch = useDispatch();

  function onTabChange(newTab) {
    setTab(newTab);
  }

  function generateLink() {
    if (tab === 'tickets') {
      return urlMaker.lottery.allTickets(round.number);
    }
    return urlMaker.lottery.allParticipants(round.number);
  }

  function handleBuyTicket() {
    if (!isLogged) {
      dispatch(openConnectModal());
      return;
    }

    if (loginType === loginTypes.PV) {
      dispatch(
        openModalAction({
          content: <BuyTicketPrivateKey />,
          modalProps: { title: 'Buy tickets' },
        }),
      );
      return;
    }

    dispatch(
      openModalAction({
        content: <BuyTicketSingle />,
        modalProps: {},
      }),
    );
  }

  const breadCrumpData = {
    item1:
  <Link href={urlMaker.lottery.root()} passHref>
    <a style={{ color: 'inherit', textDecoration: 'none' }}>
      Board
    </a>
  </Link>,
    item2: <span style={{ marginLeft: 12 }}>Round #{round?.number}</span>,
  };

  return (
    <>
      <div className="container-fluid">
        <LotteryHead title="Board" />
        <LotteryHeader />
      </div>
      <div className={styles.main}>
        <div className={classNames(styles.title, 'flex-column flex-md-row')}>
          <BreadCrump data={breadCrumpData} />
          {round?.status.toLowerCase() === 'live' && (
            <Button
              onClick={handleBuyTicket}
              htmlType="button"
              content="Buy Ticket"
              variant="primary"
              className={styles.button}
            />
          )}
        </div>
        <div className="row mx-0 mt-3">
          <div style={{ paddingLeft: 0 }} className={classNames(styles['round-prize'], 'col-12 col-md-6')}>
            <RoundPrize round={round} />
          </div>
          <div className={classNames(styles['round-info'], 'col-12 col-md-6')}>
            <RoundInfo round={round} />
          </div>
        </div>
        <div
          style={{ marginTop: 24, marginBottom: 55 }}
          className={styles['table-container']}
        >
          <BoardData onTabChange={onTabChange} round={round} />
          <Link href={generateLink()} passHref>
            <a style={{ textDecoration: 'none' }} className={styles['address-link']}>
              {tab === 'tickets' ? 'See all tickets' : 'See all addresses'}
              <span>
                <Image src={ArrowIcon} width={16} height={16} />
              </span>
            </a>
          </Link>

        </div>
      </div>
    </>
  );
};

export default RoundDetailsPage;
