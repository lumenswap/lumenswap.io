import rabetIcon from 'assets/images/rabet.svg';
import privateKeyIcon from 'assets/images/keyword.svg';
import albedoIcon from 'assets/images/albedo.svg';
import ledgerIcon from 'assets/images/ledger.svg';
import freighterIcon from 'assets/images/freighter.svg';
import { openConnectModal, openModalAction } from 'actions/modal';
import EnterKey from 'blocks/EnterKey';
import styles from './styles.module.scss';

const ConnectWallet = (props) => {
  const items = [
    { icon: albedoIcon, iconSize: '18', text: 'Albedo' },
    { icon: ledgerIcon, iconSize: '18', text: 'Ledger' },
    { icon: freighterIcon, iconSize: '16', text: 'Freighter' },
    { icon: rabetIcon, iconSize: '14', text: 'Rabet' },
  ];
  return (
    <div className={styles.box}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => {
          openModalAction({
            modalProps: {
              back: true,
              backAction: () => {
                openConnectModal();
              },
            },
            content: <EnterKey />,
          });
        }}
      >
        <div className="d-flex align-items-center">
          <div className={styles.circle}><img src={privateKeyIcon} width={16} alt="icon" /></div>
          Private Key
        </div>
        <span className="icon-arrow-left" />
      </button>
      {items.map((item, index) => (
        <button type="button" className={styles.btn}>
          <div className="d-flex align-items-center">
            <div className={styles.circle}><img src={item.icon} width={item.icon} alt="icon" /></div>
            {item.text}
          </div>
          <span className="icon-arrow-left" />
        </button>
      ))}
    </div>
  );
};

ConnectWallet.propTypes = {

};

export default ConnectWallet;
