import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AlertIcon from 'assets/images/alert';
import Button from 'components/Button';
import { openModalAction } from 'actions/modal';
import CDatePicker from 'components/CDatePicker/index';
import ConfirmProposal from 'containers/dao/createProposal/ProposalForm/Confirm';
import moment from 'moment';
import numeral from 'numeral';
import CreateProposalError from './CreateProposalError';
import FormOptions from './FormOptions/index';
import CreateProposalTextArea from './CreateProposalTextArea';
import CreateProposalInput from './CreateProposalInput';
import styles from './styles.module.scss';

const nextDay = new Date(new Date().setDate(new Date().getDate() + 1));

const ProposalForm = ({ info, setStatus }) => {
  const [show, setShow] = useState(null);
  const dispatch = useDispatch();
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
      startDate: new Date(nextDay.setHours(0, 0, 0, 0)),
      endDate: nextDay,
    },
  });

  const onSubmit = (data) => {
    dispatch(openModalAction({
      modalProps: {
        mainClassName: 'modal-br8',
      },
      content: <ConfirmProposal formData={data} setStatus={setStatus} />,
    }));
  };
  const handleFocus = (name) => {
    setShow(name);
  };
  function generateFormErrorText() {
    for (const err of Object.values(errors)) {
      if (err) {
        return err.message;
      }
    }
    return null;
  }

  useEffect(() => {
    trigger();
    const startDate = new Date(getValues('startDate'));
    const startDateIsAfterEndDate = moment(startDate).isAfter(getValues('endDate'));
    const startDateIsSameWithEndDate = moment(startDate).isSame(getValues('endDate'));
    if (startDateIsAfterEndDate || startDateIsSameWithEndDate) {
      setValue('endDate', new Date(startDate.setDate(startDate.getDate() + 1)),
        { shouldValidate: true });
    }
  }, [JSON.stringify(getValues())]);

  return (
    <div>
      <div className={classNames(styles.alert, 'mb-4')}>
        <AlertIcon />
        You need to have a minimum of
        <span className="mx-1">{numeral(info.minValue).format('0a')} {info.asset.code}</span>
        in order to submit a proposal.
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="question"
          control={control}
          defaultValue=""
          rules={{
            required: 'question required',
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
          name="proposal"
          control={control}
          defaultValue=""
          rules={{
            required: 'description required',
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
              name="startDate"
              control={control}
              defaultValue=""
              render={(props) => (
                <CDatePicker
                  onChange={props.onChange}
                  value={props.value}
                  minDate={nextDay.setHours(0, 0, 0, 0)}
                />
              )}
            />
          </div>
          <div className="col-lg-5 col-md-6 col-sm-6 col-12 mt-sm-0 mt-4">
            <label className="label-primary">End date</label>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={(props) => (
                <CDatePicker
                  onChange={props.onChange}
                  value={props.value}
                  minDate={new Date(getValues('startDate')).setDate(new Date(getValues('startDate')).getDate() + 1)}
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
          disabled={!formState.isValid || formState.isValidating}
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
