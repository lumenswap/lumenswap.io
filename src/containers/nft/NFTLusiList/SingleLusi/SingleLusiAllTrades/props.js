export const AllTradesPageGetServerSideProps = ({ params }) => ({
  props: {
    id: params.id,
  },
});
