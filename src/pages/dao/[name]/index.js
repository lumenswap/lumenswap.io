import DAOProposalList from 'containers/dao/DAOGovernanceList/DAOProposalList';

import { daoProposalsGetServerSideProps } from 'containers/dao/DAOGovernanceList/DAOProposalList/props';

export const getServerSideProps = daoProposalsGetServerSideProps;

export default DAOProposalList;
