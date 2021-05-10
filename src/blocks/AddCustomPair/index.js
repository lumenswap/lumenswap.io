import { useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import styles from './styles.module.scss';

const AddCustomPair = () => {
  const [checked, setCheckbox] = useState(false);
  const [checked2, setCheckbox2] = useState(false);
  return (
    <form className={styles.form}>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">Asset code1</label>
        <Input
          type="text"
          placeholder="G..."
          name="code1"
          id="code1"
          height={40}
          fontSize={16}
          autoFocus
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">Asset issuer 1</label>
        <Input
          type="text"
          placeholder="G..."
          name="issuer1"
          id="issuer1"
          height={40}
          fontSize={16}
          autoFocus
        />
      </div>
      <div className="form-group mb-3">
        <div className={styles.checkbox}>
          <Checkbox
            checked={checked}
            onChange={() => setCheckbox(!checked)}
            size={24}
            label="Native 1"
          />
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">Asset code2</label>
        <Input
          type="text"
          placeholder="G..."
          name="code2"
          id="code2"
          height={40}
          fontSize={16}
          autoFocus
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">Asset issuer 2</label>
        <Input
          type="text"
          placeholder="G..."
          name="issuer2"
          id="issuer2"
          height={40}
          fontSize={16}
          autoFocus
        />
      </div>
      <div className="form-group mb-4">
        <div className={styles.checkbox}>
          <Checkbox
            checked={checked2}
            onChange={() => setCheckbox2(!checked2)}
            size={24}
            label="Native 2"
          />
        </div>
      </div>
      <Button
        htmlType="submit"
        fontWeight={600}
        variant="primary"
        className={styles.btn}
        content="Add Pair"
      />
    </form>
  );
};

export default AddCustomPair;
