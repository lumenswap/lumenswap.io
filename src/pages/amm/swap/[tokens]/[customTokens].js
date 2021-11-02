import SwapPage from 'containers/amm/swap';
import { swapCustomTokenGetServerSideProps } from 'containers/amm/swap/props';

export default SwapPage;

export const getServerSideProps = swapCustomTokenGetServerSideProps;
