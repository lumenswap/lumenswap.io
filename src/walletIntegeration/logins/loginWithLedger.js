import Str from '@ledgerhq/hw-app-str';
import Transport from '@ledgerhq/hw-transport-webhid';

export default async function loginWithLedger() {
  const transport = await Transport.create();
  const str = new Str(transport);
  const result = await str.getPublicKey("44'/148'/0'");
  return result.publicKey;
}
