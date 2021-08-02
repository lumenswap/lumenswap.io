export async function swapPageGetServerSideProps(context) {
  let props = {};
  if (context.query.tokens) {
    props = {
      ...props, tokens: context.query.tokens,
    };
  }
  return {
    props,
  };
}
