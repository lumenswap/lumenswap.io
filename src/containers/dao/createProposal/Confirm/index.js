import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';
import ContractIcon from 'assets/images/contract';

import styles from './styles.module.scss';

const ConfirmProposal = ({ setStatus }) => {
  const dispatch = useDispatch();

  const onChangeStatus = () => {
    dispatch(closeModalAction());
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
    }, 3000);
  };

  return (
    <div className="pb-4 d-flex flex-column align-items-center">
      <ContractIcon />
      <h6 className={styles.title}>Confirm proposal</h6>
      <p className={styles.text}>Your proposal will not be editable after publishing.</p>
      <Button
        variant="primary"
        content="Confirm"
        onClick={onChangeStatus}
        className={styles.btn}
      />
    </div>
  );
};

ConfirmProposal.propTypes = {
  setStatus: PropTypes.func.isRequired,
};

export default ConfirmProposal;
