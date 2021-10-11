export async function PoolDetailPageGetServerSideProps({ params }) {
  return {
    props: {
      tokens: params,
    },
  };
}
