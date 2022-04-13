import getSingleOrder from 'api/birdgeAPI/getSingleOrder';

async function SingleActivityDetailsGetServerSideProps({ params }) {
  try {
    const activityInfo = await getSingleOrder(params.id);
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
