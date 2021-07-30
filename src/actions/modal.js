import actionTypes from 'actions';
import ConnectWallet from 'blocks/ConnectWallet';

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

export function openConnectModal() {
  return (dispatch) => {
    openModalAction({
      modalProps: {
        title: 'Connect Wallet',
      },
      content: <ConnectWallet />,
    })(dispatch);
  };
}
