import AllTicketsPage from 'containers/lottery/round/details/RoundTickets';
import { roundTicketGetServerSideProps } from 'containers/lottery/round/details/props';

export default AllTicketsPage;

export const getServerSideProps = roundTicketGetServerSideProps;
