import axios from 'axios';

function fetchNFTDetails(number) {
  return axios
    .get(`${process.env.REACT_APP_LUMEN_API}/nft/lusi/${number}`)
    .then(({ data }) => ({
      nftInfo: {
        price: data.price,
        asset: `Lusi #${number}`,
        ipfHash: data.ipfHash,
      },
      imageUrl: data.imageUrl,
      assetCode: data.assetCode,
    }));
}

export default fetchNFTDetails;
