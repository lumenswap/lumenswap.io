import { useState } from 'react';
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
import Options from './Options';

import styles from './styles.module.scss';

const ProposalForm = ({ setStatus }) => {
  const startDate = new Date();
  const endDate = new Date();
  const [result, setResult] = useState('');
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
    setResult(data);

    // dispatch(openModalAction({
    //   modalProps: {
    //     mainClassName: 'modal-br8',
    //   },
    //   content: <ConfirmProposal setStatus={setStatus} />,
    // }));
  };

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
          render={(props) => (
            <div className="d-flex align-items-center mb-4">
              <input
                type="text"
                className={styles.input}
                placeholder="Ask a question…"
                value={props.value}
                onChange={props.onChange}
                maxLength={30}
              />
              <CharCounter length={30} char={props.value} />
            </div>
          )}
        />
        <Controller
          name="proposal"
          control={control}
          defaultValue=""
          render={(props) => (
            <div className="d-flex flex-column mb-4">
              <textarea
                className={styles.textarea}
                placeholder="Tell more about your proposal (optional)"
                value={props.value}
                onChange={props.onChange}
                maxLength={300}
              />
              <div className="text-right mt-2">
                <CharCounter length={300} char={props.value} />
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
              render={() => (
                <Datepicker
                  startDate={startDate}
                  valueName="startDate"
                  setValue={setValue}
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
              render={() => (
                <Datepicker
                  startDate={endDate}
                  valueName="endDate"
                  setValue={setValue}
                />
              )}
            />
          </div>
        </div>

        <Button
          htmlType="submit"
          variant="primary"
          className={styles.submit}
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
