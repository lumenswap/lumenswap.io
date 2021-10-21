import AllParticipantPage from 'containers/lottery/round/Participants';
import { roundParticipantGetServerSideProps } from 'containers/lottery/round/props';

export default AllParticipantPage;

export const getServerSideProps = roundParticipantGetServerSideProps;
