import React from 'react';
import { useSelector } from 'react-redux';
import CustomModal from 'src/shared/components/CustomModal';
import hideModal from 'src/actions/modal/hide';

export default function Modal() {
  const modalState = useSelector((state) => state.modal);

  if (!modalState.show) {
    return null;
  }

  return (
    <CustomModal
      {...modalState.customProps}
      modalSize="360"
      toggle={hideModal}
      modal={modalState.show}
    >
      <modalState.Modal />
    </CustomModal>
  );
}
