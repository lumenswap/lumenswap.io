import actionTypes from 'actions';
import ConnectWallet from 'blocks/ConnectWallet';
import store from 'store';

export function openModalAction({ modalProps, content }) {
  store.dispatch({
    type: actionTypes.modal.OPEN,
    modalProps,
    content,
  });
}

export function closeModalAction() {
  store.dispatch({
    type: actionTypes.modal.CLOSE,
  });
}

export function openConnectModal() {
  openModalAction({
    modalProps: {
      title: 'Connect Wallet',
    },
    content: <ConnectWallet />,
  });
}
