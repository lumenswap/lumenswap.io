import Badge from 'components/Badge';

const DAOProposalStatusBadge = ({ status }) => {
  if (status.toLowerCase() === 'active') {
    return <Badge variant="success" content="Active" />;
  }

  if (status.toLowerCase() === 'ended') {
    return <Badge variant="info" content="Ended" />;
  }

  return <Badge variant="danger" content="Not started" />;
};

export default DAOProposalStatusBadge;
