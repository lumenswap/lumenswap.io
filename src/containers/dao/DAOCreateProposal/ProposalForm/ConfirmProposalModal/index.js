import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';
import ContractIcon from 'assets/images/contract';

import { createPendingProposal } from 'api/daoAPI';
import generateClaimableBalanceForDaoTRX from 'stellar-trx/generateClaimableBalanceForDaoTRX';
import { getAssetDetails } from 'helpers/asset';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import { Claimant } from 'stellar-sdk';
import styles from './styles.module.scss';

const ConfirmProposalModal = ({ formData, setStatus }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    setStatus({ value: 'loading', message: '' });
    createPendingProposal(formData).then(async (res) => {
      const claimants = [
        new Claimant(formData.proposer, Claimant
          .predicateNot(Claimant
            .predicateBeforeAbsoluteTime(
              ((new Date(formData.endTime).getTime() + 5 * 60 * 1000) / 1000).toString(),
            ))),
        new Claimant('GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK', Claimant
          .predicateNot(Claimant
            .predicateBeforeAbsoluteTime(
              ((new Date(formData.endTime)
                .getTime() + 3 * 30 * 24 * 60 * 60 * 1000) / 1000).toString(),
            ))),
      ];

      async function generateClaimableBalance() {
        return generateClaimableBalanceForDaoTRX(
          formData.proposer,
          formData.amount,
          getAssetDetails(formData.asset),
          claimants,
          'L_DAO_P',
          res.IpfsHash,
        );
      }

      showGenerateTrx(generateClaimableBalance, dispatch)
        .then(async (claimableBalanceTRX) => {
          await showSignResponse(claimableBalanceTRX, dispatch);
          setStatus({ value: 'success', message: '' });
        }).catch((err) => {
          setStatus({ value: 'error', message: err.message });
        });
    }).catch((err) => {
      setStatus({ value: 'error', message: err.response.message || err.message });
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

export default ConfirmProposalModal;
