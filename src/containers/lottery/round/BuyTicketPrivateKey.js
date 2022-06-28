import { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import numeral from 'numeral';
import BN from 'helpers/BN';
import Button from 'components/Button';
import NumberOnlyInput from 'components/NumberOnlyInput';
import { useDispatch, useSelector } from 'react-redux';
import { isSameAsset, getAssetDetails } from 'helpers/asset';
import { openModalAction } from 'actions/modal';
import useDefaultTokens from 'hooks/useDefaultTokens';
import { extractTokenFromCode } from 'helpers/defaultTokenUtils';
import styles from './style.module.scss';
import Purchased from './Purchased';

const BuyTicketPrivateKey = () => {
  const {
    control,
    watch,
    handleSubmit,
    trigger,
    formState,
  } = useForm({
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const userBalances = useSelector((state) => state.userBalance);
  const defaultTokens = useDefaultTokens();

  useEffect(() => {
    trigger();
  }, [useWatch({ control })]);

  function validateQuantity(value) {
    if (value <= 0) return 'Invalid Amount';

    const lspBalance = userBalances.find((i) => isSameAsset(getAssetDetails(extractTokenFromCode('LSP', defaultTokens)), i.asset));

    if (!lspBalance || new BN(value).gt(lspBalance.balance)) {
      return 'Insufficient LSP';
    }

    return true;
  }

  function buttonContentGenerator() {
    for (const error of Object.values(formState.errors)) {
      if (error.message) {
        return error.message;
      }
    }
    return 'Buy';
  }

  async function handleSend(data) {
    dispatch(
      openModalAction({
        content: <Purchased numTickets={data.quantity} />,
        modalProps: { hasClose: false },
      }),
    );
  }

  return (
    <form onSubmit={handleSubmit(handleSend)} className={styles['buy-ticket']}>
      <label>Quantity</label>
      <div className={styles['ticket-input']}>
        <Controller
          name="quantity"
          control={control}
          defaultValue=""
          rules={{
            required: 'Quantity is requried.',
            validate: validateQuantity,
          }}
          render={({ field }) => (
            <NumberOnlyInput
              onChange={field.onChange}
              value={field.value}
              placeholder="100"
              autoFocus
            />
          )}
        />
        <div>Tickets</div>
      </div>
      <div className={styles.cost}>
        <span>Total cost</span>
        <span>{numeral(watch('quantity')).format('0,0') || 0} LSP</span>
      </div>
      <Button
        htmlType="submit"
        disabled={!formState.isValid || formState.isValidating}
        content={buttonContentGenerator()}
        variant="primary"
        size="100%"
      />
    </form>
  );
};

export default BuyTicketPrivateKey;
