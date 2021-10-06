import Tickets from './Tickets';
import Participants from './Participants';

const MarketTabContent = ({
  tab, tickets, searchQuery, participants,
}) => {
  if (tab === 'tickets') {
    return <Tickets tickets={tickets} searchQuery={searchQuery} />;
  }

  if (tab === 'participants') {
    return <Participants participants={participants} searchQuery={searchQuery} />;
  }

  return null;
};

export default MarketTabContent;
