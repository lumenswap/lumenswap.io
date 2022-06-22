import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import Input from 'components/Input';
import Button from 'components/Button';
import Submitting from 'components/Submitting';
import { getAssetDetails } from 'helpers/asset';
import { addCustomTokenAction } from 'actions/userCustomTokens';
import { closeModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import useDefaultTokens from 'hooks/useDefaultTokens';
import customValidateCAddToken from './customValidateCAddToken';
import styles from './styles.module.scss';

const CAddCustomToken = ({ onAddToken }) => {
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const defaultTokens = useDefaultTokens();

  const {
    handleSubmit,
    formState,
    control,
  } = useForm({
    mode: 'onChange',
    resolver: (formValues) => customValidateCAddToken(formValues, userCustomTokens, defaultTokens),
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const asset = getAssetDetails({ code: data.code, issuer: data.issuer });
    dispatch(addCustomTokenAction(asset));
    dispatch(closeModalAction());
    onAddToken();
  };

  function generateErrorMessage() {
    for (const error of Object.values(formState.errors)) {
      if (error && error.message) {
        return error.message;
      }
    }
    return 'Add asset';
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">
          Asset code
        </label>
        <Controller
          name="code"
          control={control}
          rules={{
            required: true,
            validate: customValidateCAddToken,
          }}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="USD"
              id="code"
              height={48}
              value={field.value}
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
              id="issuer"
              value={field.value}
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

export default CAddCustomToken;
