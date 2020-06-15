import React, { useState } from 'react';
import CustomModal from '../../shared/components/CustomModal';
import ConfirmSendContent from '../../shared/components/ModalContent/ConfirmSendContent';
import TokenContent from '../../shared/components/ModalContent/TokenContent';

const ModalPage = () => {
  const [confirmModal, toggleConfirmModal] = useState(false);
  const [tokenModal, toggleTokenModal] = useState(false);
  return (
    <div className="h-100" style={{ background: '#09112c' }}>
      <div className="container mt-5">
        {/* confirm send modal */}
        <button
          className="btn btn-primary mr-3"
          onClick={() => { toggleConfirmModal(true); }}
        >confirm send
        </button>
        <CustomModal
          toggle={toggleConfirmModal}
          modal={confirmModal}
          title="Confirm Send"
          modalSize="360"
        >
          <ConfirmSendContent />
        </CustomModal>
        {/* token modal */}
        <button
          className="btn btn-primary"
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
      </div>
    </div>
  );
};

export default ModalPage;
