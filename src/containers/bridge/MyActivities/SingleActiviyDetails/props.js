import { getSingleActivityInfo } from 'api/mockAPI/bridgeUserActivities';

async function SingleActivityDetailsGetServerSideProps({ params }) {
  try {
    const activityInfo = await getSingleActivityInfo(params.id);
    return {
      props: {
        activityInfo,
      },
    };
  } catch (e) {
    if (e.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw e;
  }
}

export default SingleActivityDetailsGetServerSideProps;
