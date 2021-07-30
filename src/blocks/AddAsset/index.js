import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Input from 'components/Input';
import Button from 'components/Button';
import Submitting from 'components/Submitting';
import { checkAssetAPI } from 'api/stellar';
import getAssetDetails from 'helpers/getAssetDetails';
import defaultTokens from 'tokens/defaultTokens';
import isSameAsset from 'helpers/isSameAsset';
import pureTokens from 'helpers/pureTokens';
import { addCustomTokenAction } from 'actions/userCustomTokens';
import { closeModalAction } from 'actions/modal';
import minimizeAddress from 'helpers/minimizeAddress';
import questionLogo from 'assets/images/question.png';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';

const AddAsset = ({ changeToAsset }) => {
  const [loadingTimer, setLoadingTimer] = useState(false);
  const {
    register, handleSubmit, formState, getValues, errors, trigger, setValue,
  } = useForm({
    mode: 'onChange',
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const userCustomTokens = useSelector((state) => state.userCustomTokens);

  const onSubmit = (data) => {
    const asset = getAssetDetails({ code: data.code, issuer: data.issuer });
    dispatch(addCustomTokenAction(asset));
    changeToAsset({
      details: asset,
      web: minimizeAddress(asset.getIssuer()),
      logo: questionLogo.src,
    });
    dispatch(closeModalAction());
  };

  async function customValidator() {
    const { issuer, code } = getValues();
    if (!issuer || issuer === '' || !code || code === '') {
      return false;
    }

    setLoadingTimer(true);
    try {
      const res = await checkAssetAPI(code, issuer);
      if (res) {
        const pured = pureTokens([
          ...defaultTokens.map((i) => getAssetDetails(i)),
          ...userCustomTokens,
        ]);
        const found = pured.find((i) => isSameAsset(getAssetDetails({ issuer, code }), i));
        if (found) {
          return 'Already Added';
        }
        return true;
      }

      return 'Invalid Asset';
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTimer(false);
    }

    return false;
  }

  useEffect(() => {
    const extracted = router.query.slice(1).split('-');
    if (router.pathname === '/swap' && router.query) {
      setValue('code', extracted[0]);
      setValue('issuer', extracted[1]);
      trigger();
    }
  }, [router.pathname, router.query]);

  const showError = errors?.code?.message || errors?.issuer?.message;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">Asset code</label>
        <Input
          type="text"
          placeholder="USD"
          name="code"
          id="code"
          height={48}
          onChange={() => trigger()}
          innerRef={register({
            required: true,
            validate: customValidator,
          })}
          autoFocus
        />
      </div>
      <div className="form-group mb-0">
        <label htmlFor="issuer" className="label-primary">Asset issuer</label>
        <Input
          type="text"
          className="form-control primary-input"
          placeholder="G …"
          name="issuer"
          id="issuer"
          onChange={() => trigger()}
          innerRef={register({
            required: true,
            validate: customValidator,
          })}
        />
      </div>
      <Button
        htmlType="submit"
        size="100%"
        variant="primary"
        fontWeight={600}
        className={classNames(loadingTimer && 'loading-btn', styles.btn)}
        disabled={!formState.isValid || loadingTimer}
        onClick={() => {}}
        content={
            loadingTimer ? (
              <Submitting loadingSize={21} />
            ) : (
              showError || 'Add asset'
            )
        }
      />
    </form>
  );
};

export default AddAsset;
