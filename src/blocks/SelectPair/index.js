import classNames from 'classnames';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import stellarLogo from 'assets/images/stellar.png';
import AddCustomPair from 'blocks/AddCustomPair';
import { openModalAction } from 'actions/modal';
import styles from './styles.module.scss';

const option = (label) => <div className={styles['select-logo']}><img src={usdLogo} alt="" /><img src={stellarLogo} alt="" />{label}</div>;
const items = Array(20).fill({ label: option('USDC/XLM'), value: 'usdc' });

const SelectPair = () => (
  <div className={classNames('invisible-scroll', styles.scroll)}>
    {items.map((item, index) => (
      <div key={index}>
        {item.label}
      </div>
    ))}
    <button
      type="submit"
      className={styles.submit}
      onClick={() => {
        openModalAction({
          modalProps: { title: 'Add custom pair' },
          content: <AddCustomPair />,
        });
      }}
    >
      <span
        className="icon-plus-circle mr-2"
      />
      Add custom pair
    </button>
  </div>
);

export default SelectPair;
