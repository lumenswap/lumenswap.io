import classNames from 'classnames';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import useRequiredLogin from 'hooks/useRequiredLogin';
import Loading from 'components/Loading';
import DAOContainer from '../DAOContainer';
import SuccessDialog from './SuccessDialog';
import FailDialog from './FailDialog';
import ProposalForm from './ProposalForm';
import styles from './styles.module.scss';

const DAOCreateProposalContainer = ({ info, children }) => {
  const router = useRouter();
  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: info.name },
    { name: 'Create proposal' },
  ];

  return (
    <DAOContainer title="Create Proposal | Lumenswap" info={info}>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">

            <Breadcrumb
              spaceBetween={8}
              data={crumbData}
            />

            {children}
          </div>
        </div>
      </div>
    </DAOContainer>
  );
};

const DAOCreateProposal = ({ pageInfo }) => {
  const [status, setStatus] = useState({ value: '', message: '' });
  useRequiredLogin(urlMaker.dao.root());

  if (status.value === 'loading') {
    return (
      <DAOCreateProposalContainer info={pageInfo}>
        <div className={classNames(styles.card, styles['card-small'], styles.loading)}>
          <Loading size={48} />
          <p className={styles['loading-msg']}>
            Please wait, This operation may take a few minutes.
          </p>
        </div>
      </DAOCreateProposalContainer>
    );
  }

  if (status.value === 'success') {
    return (
      <DAOCreateProposalContainer info={pageInfo}>
        <SuccessDialog />
      </DAOCreateProposalContainer>
    );
  }

  if (status.value === 'error') {
    return (
      <DAOCreateProposalContainer info={pageInfo}>
        <FailDialog setStatus={setStatus} message={status.message} />
      </DAOCreateProposalContainer>
    );
  }

  return (
    <DAOCreateProposalContainer info={pageInfo}>
      <div className={classNames(styles.card, styles['card-regular'])}>
        <ProposalForm setStatus={setStatus} info={pageInfo} />
      </div>
    </DAOCreateProposalContainer>
  );
};

export default DAOCreateProposal;
