import Head from 'next/head';

const SpotHead = ({ title }) => (
  <Head>
    <title>{title}</title>
    <link
      rel="canonical"
      herf={`${process.env.REACT_APP_HOST}`}
    />
  </Head>
);

export default SpotHead;
