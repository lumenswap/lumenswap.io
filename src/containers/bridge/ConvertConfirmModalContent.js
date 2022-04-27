import LTokensConvertCofirmModal from './ConfirmModal/LTokensConvertConfirmModal';
import ConvertConfirmModal from './ConfirmModal/ConvertConfirmModal';

const ConvertConfirmModalContent = ({ convertInfo }) => {
  if (convertInfo.from_asset.network === 'stellar') {
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
