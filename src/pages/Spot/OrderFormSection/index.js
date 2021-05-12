import InputGroup from 'components/InputGroup';
import CustomSlider from 'components/CustomSlider';
import Button from 'components/Button';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import styles from '../styles.module.scss';

const generateForm = (type, value) => (
  <form>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className={styles['form-title']}>{capitalizeFirstLetter(type)} XLM</div>
      <div className={styles['form-value']}><span className="icon-wallet" />{value}</div>
    </div>
    <div className="mb-2">
      <InputGroup type="number" name="price" rightLabel="USDC" leftLabel="Price" />
    </div>
    <div className="mb-3">
      <InputGroup type="number" name="amount" rightLabel="XLM" leftLabel="Amount" />
    </div>
    <div className="mb-3">
      <CustomSlider />
    </div>
    <div className="mb-2">
      <InputGroup type="number" name="amount" rightLabel="USDC" leftLabel="Total" />
    </div>
    <Button
      htmlType="submit"
      variant={type}
      content={`${capitalizeFirstLetter(type)} XLM`}
      fontWeight={500}
      className={styles.button}
    />
  </form>
);

const OrderFormSection = () => (
  <div className="row" style={{ margin: '0 -24px' }}>
    <div className="col-md-6 col-sm-12 col-12 px-4">
      {generateForm('buy', '0.383 USDC')}
    </div>
    <div className="col-md-6 col-sm-12 col-12 px-4 mt-0 mt-md-0 mt-sm-4 mt-4">
      {generateForm('sell', '0.383 XLM')}
    </div>
  </div>
);

export default OrderFormSection;
