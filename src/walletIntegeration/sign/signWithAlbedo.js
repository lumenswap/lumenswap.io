import albedo from '@albedo-link/intent';
import extractErrorText from 'helpers/extractErrorText';

export default async function signWithAlbedo(trx) {
  try {
    const result = await albedo.tx({
      xdr: trx.toXDR(),
    });

    console.log(result);

    return result.result.hash;
  } catch (error) {
    throw new Error(extractErrorText({
      response: {
        data: error.ext,
      },
    }, {}));
  }
}
