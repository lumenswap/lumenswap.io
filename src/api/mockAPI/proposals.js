import sampleLogo from 'assets/images/btc-logo.png';

const infos = [
  {
    logo: sampleLogo,
    web: 'Rabet.io',
    webLink: 'https://rabet.io',
    assetLink: '/',
    name: 'Rabet',
    officialName: 'rabet',
    desc: 'Rabet is a decentralized exchange built on the Stellar network that allows you to swap and trade assets using a friendly, minimal interface.',
    proposals: 4,
    members: 20000,
    tiker: 'RBT',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    assetColor: '#1d1d1d',
  },
  {
    logo: sampleLogo,
    web: 'Lumenswap.io',
    webLink: 'https://lumenswap.io',
    assetLink: '/',
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
    assetColor: '#0e41f5',
  },
];

const proposals = [
  {
    id: '1daf815',
    assetName: 'rabet',
    logo: sampleLogo,
    status: 'active',
    statusType: 'active',
    startDate: 1643122700926,
    endDate: 1658757715292,
    detail: 'End in 2 days',
    address: '0x738afaf15151512b5j1b5151jb6trs47',
    title: 'Will Joe Biden win the 2020 United States presidential election?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
  },
  {
    id: '2afk13b',
    assetName: 'rabet',
    logo: sampleLogo,
    status: 'ended',
    statusType: 'ended',
    startDate: 1643122700926,
    endDate: 1658757715292,
    detail: 'Look marketing tokens',
    address: '0x738afaf15151512b5j1b5151jb6trs47',
    title: 'Will Joe Biden win the 2020 United States presidential election?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
  },
  {
    id: 'a4wfg41',
    assetName: 'rabet',
    logo: sampleLogo,
    status: 'Not started',
    statusType: 'not-started',
    startDate: 1643122700926,
    endDate: 1658757715292,
    detail: 'Look marketing tokens',
    address: '0x738afaf15151512b5j1b5151jb6trs48',
    title: 'Will Joe Biden win the 2020 United States presidential election?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
  },
  {
    id: '1daf81j',
    assetName: 'lumenswap',
    logo: sampleLogo,
    status: 'active',
    statusType: 'active',
    startDate: 1643122700926,
    endDate: 1658757715292,
    detail: 'End in 2 days',
    address: '0x738afaf15151512b5j1b5151jb6trs47',
    title: 'Will Joe Biden win the 2020 United States presidential election?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
  },
  {
    id: '2afk13m',
    assetName: 'lumenswap',
    logo: sampleLogo,
    status: 'ended',
    statusType: 'ended',
    startDate: 1643122700926,
    endDate: 1658757715292,
    detail: 'Look marketing tokens',
    address: '0x738afaf15151512b5j1b5151jb6trs47',
    title: 'Will Joe Biden win the 2020 United States presidential election?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
  },
  {
    id: 'a4wfg42',
    assetName: 'lumenswap',
    logo: sampleLogo,
    status: 'Not started',
    statusType: 'not-started',
    startDate: 1643122700926,
    endDate: 1658757715292,
    detail: 'Look marketing tokens',
    address: '0x738afaf15151512b5j1b5151jb6trs48',
    title: 'Will Joe Biden win the 2020 United States presidential election?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi',
  },
];

export function getProposalInfo(name) {
  return new Promise((reslove) => setTimeout(reslove, 2000)).then(() => (
    infos.find((info) => info.officialName === name)
  ));
}

export function getProposals(name, query) {
  if (query.status === 'all') {
    return new Promise((reslove) => setTimeout(reslove, 2000)).then(() => (
      proposals.filter((proposal) => proposal.assetName === name)
    ));
  }
  return new Promise((reslove) => setTimeout(reslove, 2000)).then(() => (
    proposals.filter((proposal) => proposal.statusType === query.status
    && proposal.assetName === name)
  ));
}
