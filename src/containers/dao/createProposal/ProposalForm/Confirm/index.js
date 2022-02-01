import React from 'react';
import { useDispatch } from 'react-redux';
import sendProposal from 'api/mockAPI/createProposal';
import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';
import ContractIcon from 'assets/images/contract';

import styles from './styles.module.scss';

const ConfirmProposal = ({ formData, setStatus }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    setStatus('loading');
    sendProposal(formData).then((res) => {
      setStatus(res.status);
    });
    dispatch(closeModalAction());
  };

  return (
    <div className="pb-4 d-flex flex-column align-items-center">
      <ContractIcon />
      <h6 className={styles.title}>Confirm proposal</h6>
      <p className={styles.text}>Your proposal will not be editable after publishing.</p>
      <Button
        variant="primary"
        content="Confirm"
        onClick={handleConfirm}
        className={styles.btn}
      />
    </div>
  );
};

export default ConfirmProposal;
