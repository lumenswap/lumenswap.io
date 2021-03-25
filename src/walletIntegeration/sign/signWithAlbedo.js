import albedo from '@albedo-link/intent';
import extractErrorText from 'helpers/extractErrorText';
import generateSwapTRX from 'stellar-trx/generateSwapTRX';

export default async function signWithAlbedo() {
  try {
    const trx = await generateSwapTRX({});

    const result = await albedo.tx({
      xdr: trx.toXDR(),
      submit: true,
    });

    return result.result.hash;
  } catch (error) {
    throw new Error(extractErrorText({
      response: {
        data: error.ext,
      },
    }, {}));
  }
}
