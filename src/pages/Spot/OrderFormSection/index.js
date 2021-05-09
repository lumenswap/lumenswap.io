import InputGroup from 'components/InputGroup';
import CustomSlider from 'components/CustomSlider';

const OrderFormSection = () => (
  <div className="row">
    <div className="col-6">
      <form>
        <div className="mb-2">
          <InputGroup type="number" name="price" rightLabel="USDC" leftLabel="Price" />
        </div>
        <div>
          <InputGroup type="number" name="amount" rightLabel="XLM" leftLabel="Amount" />
        </div>
        <div className="my-3">
          <CustomSlider />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <InputGroup type="number" name="amount" rightLabel="USDC" leftLabel="Total" />
        </div>
      </form>
    </div>
    <div className="col-6" />
  </div>
);

export default OrderFormSection;
