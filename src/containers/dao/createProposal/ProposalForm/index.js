import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import AlertIcon from 'assets/images/alert';
import Button from 'components/Button';
import { openModalAction } from 'actions/modal';
import Datepicker from 'components/Datepicker';
import CharCounter from 'components/CharCounter';
import ConfirmProposal from 'containers/dao/createProposal/Confirm';
import BN from 'helpers/BN';
import Options from './Options';

import styles from './styles.module.scss';

const ProposalForm = ({ setStatus }) => {
  const date = new Date();
  const [show, setShow] = useState(null);
  const [result, setResult] = useState('');
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    errors,
    trigger,
    formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      startDate: new Date().setHours(0, 0, 0, 0),
      endDate: new Date(),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setResult(data);

    dispatch(openModalAction({
      modalProps: {
        mainClassName: 'modal-br8',
      },
      content: <ConfirmProposal setStatus={setStatus} />,
    }));
  };
  const handleFocus = (name) => {
    setShow(name);
  };
  const validateStartDate = (d) => {
    console.log(`${new BN(date.setHours(0, 0, 0, 0)).gt(Date.parse(d))} date = ${new BN(date.getTime() - 1000)} s date = ${new BN(Date.parse(d))}`);
    if (new BN(date.getTime() - 1000).gt(Date.parse(d))) {
      return 'invalid start date';
    }
    return true;
  };
  const validateEndDate = (d) => {
    if (new BN(Date.parse(getValues('startDate'))).gt(Date.parse(d))) {
      return 'invalid end date';
    }
    return true;
  };

  useEffect(() => {
    trigger();
  }, [JSON.stringify(getValues())]);

  function generateBtnContent() {
    for (const err of Object.values(errors)) {
      if (err) {
        return err.message;
      }
    }
    return 'Create proposal';
  }
  return (
    <div>
      <div className={classNames(styles.alert, 'mb-4')}>
        <AlertIcon />
        You need to have a minimum of
        <span className="mx-1">10K RBT</span>
        in order to submit a proposal.
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="question"
          control={control}
          defaultValue=""
          rules={{
            required: 'question requied',
          }}
          render={(props) => (
            <div className="d-flex align-items-center mb-4">
              <input
                type="text"
                className={styles.input}
                placeholder="Ask a question…"
                value={props.value}
                onChange={props.onChange}
                maxLength={50}
                onFocus={() => { handleFocus(props.name); }}
                onBlur={() => { setShow(null); }}
              />
              <CharCounter length={50} char={props.value} show={props.name === show} />
            </div>
          )}
        />
        <Controller
          name="proposal"
          control={control}
          defaultValue=""
          rules={{
            required: 'description requied',
          }}
          render={(props) => (
            <div className="d-flex flex-column mb-4">
              <textarea
                className={styles.textarea}
                placeholder="Tell more about your proposal (optional)"
                value={props.value}
                onChange={props.onChange}
                maxLength={500}
                onFocus={() => { handleFocus(props.name); }}
                onBlur={() => { setShow(null); }}
              />
              <div className="text-right mt-2">
                <CharCounter length={500} char={props.value} show={props.name === show} />
              </div>
            </div>
          )}
        />
        <Options control={control} Controller={Controller} />

        <div className="row mt-4">
          <div className="col-lg-5 col-md-6 col-sm-6 col-12">
            <label className="label-primary">Start date</label>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              rules={{
                validate: { validateStartDate },
              }}
              render={() => (
                <Datepicker
                  startDate={date}
                  valueName="startDate"
                  setValue={setValue}
                  trigger={() => {
                    trigger();
                  }}
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
              rules={{
                validate: { validateEndDate },
              }}
              render={() => (
                <Datepicker
                  startDate={date}
                  valueName="endDate"
                  setValue={setValue}
                  trigger={() => {
                    trigger();
                  }}
                />
              )}
            />
          </div>
        </div>

        <Button
          htmlType="submit"
          variant="primary"
          className={styles.submit}
          disabled={!formState.isValid || formState.isValidating}
        >{generateBtnContent()}
        </Button>
      </form>
    </div>
  );
};

ProposalForm.propTypes = {
  setStatus: PropTypes.func.isRequired,
};

export default ProposalForm;
