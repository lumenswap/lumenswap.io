import getFakeChartData from 'api/chartsFakeData';

export const PoolsPageGetServerSideProps = async () => {
  const chartData = await getFakeChartData();
  return {
    props: {
      chartData,
    },
  };
};
