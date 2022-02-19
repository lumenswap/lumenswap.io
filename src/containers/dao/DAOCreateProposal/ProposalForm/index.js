import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AlertIcon from 'assets/images/alert';
import Button from 'components/Button';
import { openModalAction } from 'actions/modal';
import CDatePicker from 'components/CDatePicker/index';
import moment from 'moment';
import numeral from 'numeral';
import { getAssetDetails } from 'helpers/asset';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import BN from 'helpers/BN';
import ConfirmProposalModal from './ConfirmProposalModal';
import CreateProposalError from './CreateProposalError';
import FormOptions from './FormOptions/index';
import CreateProposalTextArea from './CreateProposalTextArea';
import CreateProposalInput from './CreateProposalInput';
import styles from './styles.module.scss';

const nextDayMoment = moment().utc().startOf('day').add(2, 'day');

const ProposalForm = ({ info, setStatus }) => {
  const [show, setShow] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const dispatch = useDispatch();
  const userAssetBalance = useUserSingleAsset(getAssetDetails({
    code: info.assetCode,
    issuer: info.assetIssuer,
  }))?.balance ?? '0';

  const {
    handleSubmit,
    control,
    getValues,
    errors,
    trigger,
    setValue,
    formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      startTime: nextDayMoment.toDate(),
      endTime: nextDayMoment.clone().add(5, 'day').toDate(),
    },
  });

  const onSubmit = (data) => {
    const options = [];
    let sanitizedData = { ...data };

    for (const [key, value] of Object.entries(sanitizedData)) {
      if (key.startsWith('option')) {
        options.push(value);
        delete sanitizedData[key];
      }
    }

    sanitizedData = {
      ...sanitizedData,
      startTime: moment(data.startTime).utc().set({
        hour: 24, minute: 0, second: 0, millisecond: 0,
      }).valueOf(),
      endTime: moment(data.endTime).utc().set({
        hour: 24, minute: 0, second: 0, millisecond: 0,
      }).valueOf(),
      options,
      asset: getAssetDetails({ code: info.assetCode, issuer: info.assetIssuer }),
      amount: info.minValue,
      proposer: userAddress,
      governantId: info.id,
    };

    dispatch(openModalAction({
      modalProps: {
        mainClassName: 'modal-br8',
      },
      content: <ConfirmProposalModal formData={sanitizedData} setStatus={setStatus} />,
    }));
  };

  const handleFocus = (name) => {
    setShow(name);
  };

  function generateFormErrorText() {
    if (new BN(info.minValue).gt(userAssetBalance)) {
      return 'You dont have enough balance to create a proposal';
    }
    for (const err of Object.values(errors)) {
      if (err) {
        return err.message;
      }
    }
    return null;
  }

  useEffect(() => {
    trigger();
    const startTime = getValues('startTime');
    const endTime = getValues('endTime');
    if (!moment(endTime).isSame(moment(startTime).add(5, 'day'))) {
      setValue('endTime', moment(startTime).add(5, 'day').toDate(),
        { shouldValidate: true });
    }
  }, [JSON.stringify(getValues())]);

  return (
    <div>
      <div className={classNames(styles.alert, 'mb-4')}>
        <AlertIcon />
        You need to have a minimum of
        <span className="mx-1">{numeral(info.minValue).format('0a')} {info.assetCode}</span>
        in order to submit a proposal.
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{
            required: 'Question required',
          }}
          render={(props) => (
            <CreateProposalInput
              props={props}
              show={show}
              setShow={setShow}
              handleFocus={handleFocus}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{
            required: 'Description required',
          }}
          render={(props) => (
            <CreateProposalTextArea
              props={props}
              show={show}
              setShow={setShow}
              handleFocus={handleFocus}
            />
          )}
        />
        <FormOptions control={control} />

        <div className="row mt-4">
          <div className="col-lg-5 col-md-6 col-sm-6 col-12">
            <label className="label-primary">Start date</label>
            <Controller
              name="startTime"
              control={control}
              defaultValue=""
              render={(props) => (
                <CDatePicker
                  onChange={props.onChange}
                  value={props.value}
                  minDate={nextDayMoment.toDate()}
                />
              )}
            />
          </div>
          <div className="col-lg-5 col-md-6 col-sm-6 col-12 mt-sm-0 mt-4">
            <label className="label-primary">End date</label>
            <Controller
              name="endTime"
              control={control}
              defaultValue=""
              render={(props) => (
                <CDatePicker
                  onChange={props.onChange}
                  value={props.value}
                  disabled
                />
              )}
            />
          </div>
        </div>
        {generateFormErrorText() && <CreateProposalError error={generateFormErrorText()} />}

        <Button
          htmlType="submit"
          variant="primary"
          className={styles.submit}
          disabled={!formState.isValid || formState.isValidating || generateFormErrorText()}
        >Create proposal
        </Button>
      </form>
    </div>
  );
};

ProposalForm.propTypes = {
  setStatus: PropTypes.func.isRequired,
};

export default ProposalForm;
