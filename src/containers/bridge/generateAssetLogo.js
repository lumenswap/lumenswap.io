import questionLogo from 'assets/images/question.png';

function generateBridgeAssetLogo(asset) {
  if (!asset.logo || asset.logo === '') {
    return questionLogo;
  }
  return asset.logo;
}

export default generateBridgeAssetLogo;
