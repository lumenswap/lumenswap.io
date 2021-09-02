import axios from 'axios';

export function checkAssetValidation(code, issuer) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/horizon/validate-token?code=${code}&issuer=${issuer}`)
    .then((res) => res.data.valid)
    .catch(() => false);
}
