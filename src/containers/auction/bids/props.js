async function BidsPageGetServerSideProps({ params }) {
  const pageName = params.name;
  const assetCode = pageName.substring(
    pageName.indexOf('(') + 1,
    pageName.lastIndexOf(')'),
  );

  return {
    props: {
      pageName,
      assetCode,
    },
  };
}

export default BidsPageGetServerSideProps;
