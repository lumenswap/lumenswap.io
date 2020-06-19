import TokenContent from 'src/shared/components/ModalContent/TokenContent';
import show from './show';

export default (props) => {
  show(
    TokenContent,
    {
      title: 'Select Asset',
    },
    props,
  );
};
