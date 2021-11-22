export const AllOffersPageGetServerSideProps = ({ params }) => ({
  props: {
    id: params.id,
  },
});
