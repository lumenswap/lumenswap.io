import { useEffect } from 'react';
import minimizeAddress from 'helpers/minimizeAddress';
import questionLogo from 'assets/images/question.png';
import { addCustomTokenAction } from 'actions/userCustomTokens';
import { extractTokenFromCode } from 'helpers/defaultTokenUtils';
import getAssetDetails from 'helpers/getAssetDetails';
import { changeFromAsset, changeToAsset } from 'containers/swap/swapHelpers';
import isSameAsset from 'helpers/isSameAsset';
import { useDispatch, useSelector } from 'react-redux';

export default function useUrl(custom, setValues, getValues, dependencies) {
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    async function check() {
      if (custom) {
        let from = getAssetDetails({
          code: custom.from.code,
          issuer: custom.from.issuer,
        });

        if (custom.from.isDefault) {
          from = getAssetDetails(extractTokenFromCode(custom.from.code));
        }

        let to = getAssetDetails({
          code: custom.to.code,
          issuer: custom.to.issuer,
        });

        if (custom.to.isDefault) {
          to = getAssetDetails(extractTokenFromCode(custom.to.code));
        }

        if (!custom.from.isDefault) {
          const foundFrom = userCustomTokens.find((i) => isSameAsset(i, from));

          if (!foundFrom) {
            dispatch(addCustomTokenAction(from));
          }
        }

        let fromLogo = questionLogo;
        let toLogo = questionLogo;

        if (custom.from.isDefault) {
          fromLogo = extractTokenFromCode(custom.from.code).logo;
        }

        if (custom.to.isDefault) {
          toLogo = extractTokenFromCode(custom.to.code).logo;
        }

        changeFromAsset({
          details: from,
          web: minimizeAddress(from.getIssuer()),
          logo: fromLogo,
        }, setValues, getValues);

        if (!custom.to.isDefault) {
          const foundTo = userCustomTokens.find((i) => isSameAsset(i, to));
          if (!foundTo) {
            dispatch(addCustomTokenAction(to));
          }
        }
        changeToAsset({
          details: to,
          web: minimizeAddress(to.getIssuer()),
          logo: toLogo,
        }, setValues, getValues);
      }
    }

    check();
  }, dependencies);
}
