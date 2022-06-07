import classNames from 'classnames';
import EmptyCheckCircle from 'assets/images/emptyCheckCircle';
import Clock from 'assets/images/clock';
import ArrowRight from 'assets/images/arrowRight';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import styles from './styles.module.scss';
import ConvertConfirmModalContent from '../ConvertConfirmModalContent';
import { orderStates } from '../orderStates';

const StatusLabel = ({ status, orderInfo }) => {
  const dispatch = useDispatch();
  const handleOpenCurrentStep = (e) => {
    e.preventDefault();
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main pb-0',
          hasClose: true,
        },
        content: <ConvertConfirmModalContent convertInfo={orderInfo} />,
      }),
    );
  };

  if (status.toLowerCase() === orderStates.DONE) {
    return (
      <div className={classNames('d-flex align-items-center',
        styles['status-success'])}
      >
        <EmptyCheckCircle />
        <div className="ml-1">Success</div>
      </div>
    );
  }

  if (status.toLowerCase() === orderStates.AWAITING_USER_PAYMENT
  || status.toLowerCase() === orderStates.USER_PAID
    || status.toLowerCase() === orderStates.SENDING
    || status.toLowerCase() === orderStates.PRE_SENDING) {
    return (
      <div className={classNames('d-flex align-items-center',
        styles['status-pending'])}
      >
        <Clock />
        <div className="mx-1">Pending</div>
        <ArrowRight
          className={styles['arrow-right']}
          onClick={(e) => { handleOpenCurrentStep(e); }}
        />
      </div>
    );
  }

  if (status.toLowerCase() === orderStates.EXPIRED) {
    return (
      <div className={styles['status-expired']}>
        Expired
      </div>
    );
  }
  throw new Error(`${status.toLowerCase()} is not handled`);
};

export default StatusLabel;
