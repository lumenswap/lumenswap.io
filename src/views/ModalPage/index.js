import React, { useState } from 'react';
import CustomModal from '../../shared/components/CustomModal';
import ConfirmSendContent from '../../shared/components/ModalContent/ConfirmSendContent';

const ModalPage = () => {
  const [confirmModal, toggleConfirmModal] = useState(false);
  return (
    <div className="h-100" style={{ background: '#09112c' }}>
      <div className="container mt-5">
        <button
          className="btn btn-primary"
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
      </div>
    </div>
  );
};

export default ModalPage;
