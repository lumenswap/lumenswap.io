import { useEffect, useState } from 'react';
import Image from 'next/image';
import { openConnectModal, openModalAction } from 'actions/modal';
import classNames from 'classnames';
import Loading from 'components/Loading';
import LotteryHead from 'containers/lottery/LotteryHead';
import Button from 'components/Button';
import ArrowIcon from 'assets/images/arrow-right-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginTypes } from 'reducers/user';
import { getRoundParticipants, getAllRoundTickets } from 'api/lottery';
import BuyTicketSingle from './BuyTicketSingle';
import BuyTicketPrivateKey from './BuyTicketPrivateKey';
import BoardData from './BoardData';
import RoundPrize from './RoundPrize';
import RoundInfo from './RoundInfo';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';

const RoundDetailsPage = ({ fetchedRound }) => {
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [participants, setParticipants] = useState(null);

  const isLogged = useSelector((state) => state.user.logged);
  const loginType = useSelector((state) => state.user.loginType);
  const dispatch = useDispatch();

  function handleBuyTicket() {
    if (!isLogged) {
      dispatch(openConnectModal());
      return;
    }

    if (loginType === loginTypes.PV) {
      dispatch(
        openModalAction({
          content: <BuyTicketPrivateKey />,
          modalProps: { title: 'Buy ticket' },
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

  useEffect(() => {
    setRound(fetchedRound);
  }, [fetchedRound]);

  useEffect(() => {
    async function fetchData() {
      const fetchedTickets = await getAllRoundTickets(round.number);
      const fetchedParticipants = await getRoundParticipants(round.number);

      setParticipants(fetchedParticipants.data);
      setTickets(fetchedTickets.data);
      setLoading(false);
    }

    if (round) fetchData();
  }, [round]);

  if (loading) {
    return (
      <>
        <div className="container-fluid">
          <LotteryHead title="Board" />
          <LotteryHeader />
        </div>
        <div className={styles.loadingContainer}>
          <Loading size={50} />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container-fluid">
        <LotteryHead title="Board" />
        <LotteryHeader />
      </div>
      <div className={styles.main}>
        <div className={classNames(styles.title, 'flex-column flex-md-row')}>
          <h1 className={classNames(styles.board, 'd-flex align-items-center')}>
            Board
            <span style={{ marginLeft: 12, marginTop: 3 }}>
              <Image src={ArrowIcon} width={18} height={18} />
            </span>
            <span style={{ marginLeft: 12 }}>Round #{round?.number}</span>
          </h1>
          <Button
            onClick={handleBuyTicket}
            htmlType="button"
            disabled={round?.status.toLowerCase() !== 'live'}
            content="Buy Ticket"
            variant="primary"
            className={styles.button}
          />
        </div>
        <div className="row mx-0 mt-3">
          <div style={{ paddingLeft: 0 }} className="col-12 col-md-6">
            <RoundPrize round={round} />
          </div>
          <div className={classNames(styles['round-info'], 'col-12 col-md-6')}>
            <RoundInfo round={round} participants={participants} tickets={tickets} />
          </div>
        </div>
        <div
          style={{ marginTop: 24, marginBottom: 55 }}
          className={styles['table-container']}
        >
          <BoardData
            participants={participants}
            tickets={tickets}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default RoundDetailsPage;
