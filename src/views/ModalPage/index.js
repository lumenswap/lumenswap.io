import React, { useState } from 'react';
import CustomModal from 'Root/shared/components/CustomModal';
import ConfirmSendContent from 'Root/shared/components/ModalContent/ConfirmSendContent';
import TokenContent from 'Root/shared/components/ModalContent/TokenContent';
import ConfirmSwapContent from 'Root/shared/components/ModalContent/ConfirmSwapContent';
import WaitingContent
  from '../../shared/components/ModalContent/WaitingContent';

const ModalPage = () => {
  const [confirmSendModal, toggleConfirmSendModal] = useState(false);
  const [confirmSwapModal, toggleConfirmSwapModal] = useState(false);
  const [tokenModal, toggleTokenModal] = useState(false);
  const [waitingModal, toggleWaitingModal] = useState(false);
  return (
    <div className="h-100" style={{ background: '#09112c' }}>
      <div className="container mt-5">
        {/* confirm send modal */}
        <button
          className="btn btn-primary mr-3"
          onClick={() => { toggleConfirmSendModal(true); }}
        >confirm send
        </button>
        <CustomModal
          toggle={toggleConfirmSendModal}
          modal={confirmSendModal}
          title="Confirm Send"
          modalSize="360"
        >
          <ConfirmSendContent />
        </CustomModal>

        {/* confirm swap */}
        <button
          className="btn btn-primary mr-3"
          onClick={() => { toggleConfirmSwapModal(true); }}
        >Confirm Swap
        </button>
        <CustomModal
          toggle={toggleConfirmSwapModal}
          modal={confirmSwapModal}
          title="Confirm Swap"
          modalSize="360"
        >
          <ConfirmSwapContent />
        </CustomModal>

        {/* token modal */}
        <button
          className="btn btn-primary mr-3"
          onClick={() => { toggleTokenModal(true); }}
        >select token
        </button>
        <CustomModal
          toggle={toggleTokenModal}
          modal={tokenModal}
          title="Select token"
          modalSize="360"
        >
          <TokenContent />
        </CustomModal>

        {/* modal */}
        <button
          className="btn btn-primary"
          onClick={() => { toggleWaitingModal(true); }}
        >waiting
        </button>
        <CustomModal
          toggle={toggleWaitingModal}
          modal={waitingModal}
          modalSize="360"
        >
          <WaitingContent message="Waiting for sign transaction" />
        </CustomModal>
      </div>
    </div>
  );
};

export default ModalPage;
