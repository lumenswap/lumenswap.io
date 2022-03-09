import { getSingleActivityInfo } from 'api/mockAPI/bridgeUserActivities';

async function SingleActivityDetailsGetServerSideProps({ params }) {
  const activityInfo = await getSingleActivityInfo(params.id);
  return {
    props: {
      activityInfo,
    },
  };
}

export default SingleActivityDetailsGetServerSideProps;
