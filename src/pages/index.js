import Router from 'next/router';
import { initializeStore } from 'store';

const store = initializeStore();
console.log(store);

export default function Home() {
  return null;
}
