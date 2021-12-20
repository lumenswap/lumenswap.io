import AllParticipantPage from 'containers/lottery/round/details/RoundParticipants';
import { roundParticipantGetServerSideProps } from 'containers/lottery/round/details/props';

export default AllParticipantPage;

export const getServerSideProps = roundParticipantGetServerSideProps;
