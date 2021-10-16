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
import BuyTicketSingle from './BuyTicketSingle';
import BuyTicketPrivateKey from './BuyTicketPrivateKey';
import BoardData from './BoardData';
import RoundPrize from './RoundPrize';
import RoundInfo from './RoundInfo';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';

const RoundDetailsPage = ({ round }) => {
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

  return (
    <>
      <div className="container-fluid">
        <LotteryHead title="Board" />
        <LotteryHeader />
      </div>
      <div className={styles.main}>
        <div className={classNames(styles.title, 'flex-column flex-md-row')}>
          <h1 className={classNames(styles.board, 'd-flex align-items-center')}>
            <Link href={urlMaker.lottery.root()} passHref>
              <a style={{ color: 'black', textDecoration: 'none' }}>
                Board
              </a>
            </Link>
            <span style={{ marginLeft: 12, marginTop: 3 }}>
              <Image src={ArrowIcon} width={18} height={18} />
            </span>
            <span style={{ marginLeft: 12 }}>Round #{round?.number}</span>
          </h1>
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
          <BoardData round={round} />
        </div>
      </div>
    </>
  );
};

export default RoundDetailsPage;
