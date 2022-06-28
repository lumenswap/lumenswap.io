import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import Input from 'components/Input';
import Button from 'components/Button';
import Submitting from 'components/Submitting';
import { getAssetDetails } from 'helpers/asset';
import urlMaker from 'helpers/urlMaker';
import { addCustomTokenAction } from 'actions/userCustomTokens';
import { closeModalAction } from 'actions/modal';
import minimizeAddress from 'helpers/minimizeAddress';
import questionLogo from 'assets/images/question.png';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useDefaultTokens from 'hooks/useDefaultTokens';
import customValidateAddNewAsset from './customValidateAddAsset';
import styles from './styles.module.scss';

const AddAsset = ({
  changeToAsset, currentFrom, type,
}) => {
  const router = useRouter();
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const defaultTokens = useDefaultTokens();
  const {
    control,
    handleSubmit,
    formState,
  } = useForm({
    mode: 'onChange',
    resolver: (formValues) => customValidateAddNewAsset(formValues,
      userCustomTokens, defaultTokens),
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const asset = getAssetDetails({ code: data.code, issuer: data.issuer });
    dispatch(addCustomTokenAction(asset));

    changeToAsset({
      details: asset,
      web: minimizeAddress(asset.getIssuer()),
      logo: questionLogo,
    });
    let swapBaseURL = urlMaker.obm.swap;
    if (type === 'amm') {
      swapBaseURL = urlMaker.amm.swap;
    }

    router.push(
      swapBaseURL.custom(
        currentFrom?.details?.code,
        currentFrom?.issuer,
        asset.code,
        asset.issuer,
      ),
    );

    dispatch(closeModalAction());
  };

  // useEffect(() => {
  //   const extracted = router.query.slice(1).split('-');
  //   if (router.pathname === '/swap' && router.query) {
  //     setValue('code', extracted[0]);
  //     setValue('issuer', extracted[1]);
  //     trigger();
  //   }
  // }, [router.pathname, router.query]);

  function generateErrorMessage() {
    for (const error of Object.values(formState.errors)) {
      if (error && error.message) {
        return error.message;
      }
    }
    return 'Add asset';
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">
          Asset code
        </label>
        <Controller
          name="code"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="USD"
              value={field.value}
              id="code"
              height={48}
              onChange={field.onChange}
              autoFocus
            />
          )}
        />
      </div>
      <div className="form-group mb-0">
        <label htmlFor="issuer" className="label-primary">
          Asset issuer
        </label>
        <Controller
          name="issuer"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input
              type="text"
              className="form-control primary-input"
              placeholder="G …"
              value={field.value}
              id="issuer"
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Button
        htmlType="submit"
        size="100%"
        variant="primary"
        fontWeight={600}
        className={classNames(formState.isValidating && 'loading-btn', styles.btn)}
        disabled={!formState.isValid || formState.isValidating}
        onClick={() => {}}
        content={
          formState.isValidating ? (
            <Submitting loadingSize={21} />
          ) : (
            generateErrorMessage()
          )
        }
      />
    </form>
  );
};

export default AddAsset;
