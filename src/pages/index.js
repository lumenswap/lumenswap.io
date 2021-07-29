import Router from 'next/router';

export default function Home() {
  return null;
}

export function getServerSideProps({ res }) {
  if (res) {
    res.writeHead(302, { Location: '/swap' });
    res.end();
  } else {
    Router.replace('/swap');
  }
}
