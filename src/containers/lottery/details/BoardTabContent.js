import Tickets from './Tickets';
import Participants from './Participants';

const BoardTabContent = ({
  tab, searchQuery, round,
}) => {
  if (tab === 'tickets') {
    return <Tickets round={round} searchQuery={searchQuery} />;
  }

  if (tab === 'participants') {
    return <Participants round={round} searchQuery={searchQuery} />;
  }

  return null;
};

export default BoardTabContent;
