import LTokensConvertCofirmModal from './ConfirmModal/LTokensConvertConfirmModal';
import ConvertConfirmModal from './ConfirmModal/ConvertConfirmModal';

const ConvertConfirmModalContent = ({ convertInfo, defaultSignLoading }) => {
  if (convertInfo.from_asset.network === 'stellar') {
    return (
      <LTokensConvertCofirmModal
        defaultSignLoading={defaultSignLoading}
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
