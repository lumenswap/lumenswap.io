import LTokensConvertCofirmModal from './ConfirmModal/LTokensConvertConfirmModal';
import ConvertConfirmModal from './ConfirmModal/ConvertConfirmModal';

const ConvertConfirmModalContent = ({ convertInfo }) => {
  if (convertInfo.tokenA.name.charAt(0) === 'L') {
    return (
      <LTokensConvertCofirmModal
        convertInfo={convertInfo}
      />
    );
  }

  return (
    <ConvertConfirmModal
      convertInfo={convertInfo}
    />
  );
};

export default ConvertConfirmModalContent;
