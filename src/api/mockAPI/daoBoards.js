import sampleLogo from 'assets/images/btc-logo.png';

const boards = [
  {
    logo: sampleLogo,
    name: 'Lumenswap',
    officialName: 'lumenswap',
    desc: 'Lumenswap is a decentralized exchange built on the Stellar network that allows you to swap and trade assets using a friendly, minimal interface.',
    proposals: 4,
    members: 110000,
    tiker: 'LSP',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
  },
  {
    logo: sampleLogo,
    name: 'Rabet',
    officialName: 'rabet',
    desc: 'Rabet is an integrated set of open-source wallets for the Stellar network, allowing everyone around the world to interact with Stellar.',
    proposals: 4,
    members: 20000,
    tiker: 'RBT',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
  },
];

function getDAOBorads() {
  return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => (boards));
}

export default getDAOBorads;
