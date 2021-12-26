import { getAllRounds } from 'api/lottery';

export default async function boardGetServerSideProps() {
  const fetchedRounds = await getAllRounds();
  return {
    props: {
      rounds: fetchedRounds.data,
    },
  };
}
