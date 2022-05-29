import actionTypes from 'actions';
import ConnectWallet from 'blocks/ConnectWallet';
import styles from './styles.module.scss';

export function openModalAction({ modalProps, content }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.modal.OPEN,
      modalProps,
      content,
    });
  };
}

export function closeModalAction() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.modal.CLOSE,
    });
  };
}

export function updateModalProps(props) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.modal.UPDATE_PROPS,
      props,
    });
  };
}

export function openConnectModal() {
  return (dispatch) => {
    openModalAction({
      modalProps: {
        title: 'Connect Wallet',
        className: `${styles.modal}`,
      },
      content: <ConnectWallet />,
    })(dispatch);
  };
}
