import imgSrc from 'assets/images/nft-sample-2.png';
import LSP from 'tokens/LSP';

function getDetails(lusiId) {
  return {
    nftInfo: {
      price: 10000,
      asset: `Lusi #${lusiId}`,
      hash: '0xdD467E06b406b406b406b406b406b406b406b406b4fA',
    },
    ownerInfo: {
      address: '0xdD467E06b406b406b406b406b406b406b406b406b4fA',
      telegram: 'lumenswap',
      twitter: 'lumenswap',
    },
    asset: LSP,
    lusiImage: imgSrc,
  };
}

function fetchNFTDetails(lusiId) {
  return new Promise((reslove) => setTimeout(reslove, 1)).then(() => getDetails(lusiId));
}

export default fetchNFTDetails;
