export default function loginWithRabet() {
  return global.rabet.connect().then((res) => res.publicKey);
}
