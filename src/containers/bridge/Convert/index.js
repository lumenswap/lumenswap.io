import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import Button from 'components/Button';
import btcSrc from 'assets/images/btc-logo.png';
import Input from 'components/Input';
import SelectAsset from './SelectAsset';

import styles from './styles.module.scss';

const BridgeConvert = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => { console.warn(data); };

  const onOpenModal = () => {
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main',
        },
        content: <SelectAsset />,
      }),
    );
  };

  return (
    <BridgeContainer title="Bridge Convert | Lumenswap">
      <div className="layout main d-flex justify-content-center">
        <div className={styles.card}>
          <div className={styles.container}>
            <Button
              variant="basic"
              size="100%"
              className={styles['convert-btn']}
              onClick={onOpenModal}
            >
              <div className="d-flex align-items-center">
                <img src={btcSrc} width={30} height={30} alt="logo" />
                <div className={styles.currency}>BTC</div>
              </div>
              <div className="icon-angle-down color-base" />
            </Button>

            <div className={styles.icon}>
              <span className="icon-arrow-down color-primary" />
            </div>

            <Button
              variant="basic"
              size="100%"
              className={styles['convert-btn']}
              onClick={onOpenModal}
            >
              <div className="d-flex align-items-center">
                <img src={btcSrc} width={30} height={30} alt="logo" />
                <div className={styles.currency}>ETH</div>
              </div>
              <div className="icon-angle-down color-base" />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label-primary mt-3">Amount</label>
            <Controller
              name="amount"
              control={control}
              render={(props) => (
                <Input
                  type="number"
                  placeholder="1"
                  value={props.value}
                  onChange={props.onchange}
                />
              )}
            />

            <label className="label-primary mt-3">Destination</label>
            <Controller
              name="destination"
              control={control}
              render={(props) => (
                <Input
                  type="text"
                  placeholder="G …"
                  value={props.value}
                  onChange={props.onchange}
                />
              )}
            />

            <Button
              variant="primary"
              htmlType="submit"
              size="100%"
              fontWeight={500}
              className="mt-4"
            >
              Convert
            </Button>
          </form>
        </div>
      </div>
    </BridgeContainer>
  );
};

export default BridgeConvert;
