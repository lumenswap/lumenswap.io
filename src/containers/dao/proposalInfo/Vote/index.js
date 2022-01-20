import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

import Button from 'components/Button';
import InputGroup from 'components/InputGroup';

import styles from './styles.module.scss';

const Index = () => {
  const {
    handleSubmit, control,
  } = useForm({ mode: 'onChange' });

  async function onSubmit(data) { console.warn(data); }

  return (
    <div className="pb-4 main">
      <p className={styles.title}>
        Will Joe Biden win the 2020 United States presidential election?
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <hr className={styles.hr} />
        <label className="label-primary mb-1">Amount</label>
        <Controller
          name="tokenAmount"
          control={control}
          defaultValue=""
          render={(props) => (
            <InputGroup
              variant="primary"
              placeholder="100"
              rightLabel="LSP"
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
        <div className={styles.msg}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua Egestas purus viverra accumsan in nisl nisi
        </div>
        <Button
          variant="primary"
          content="Vote"
          className={styles.btn}
        />
      </form>
    </div>
  );
};

Index.propTypes = {

};

export default Index;
