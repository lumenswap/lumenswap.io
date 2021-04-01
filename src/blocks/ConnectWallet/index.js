import rabetIcon from 'assets/images/rabet.svg';
import privateKeyIcon from 'assets/images/keyword.svg';
import albedoIcon from 'assets/images/albedo.svg';
import ledgerIcon from 'assets/images/ledger.svg';
import freighterIcon from 'assets/images/freighter.svg';
import { openConnectModal, openModalAction } from 'actions/modal';
import EnterKey from 'blocks/EnterKey';
import { loginTypes } from 'reducers/user';
import Initializing from 'blocks/Initializing';
import styles from './styles.module.scss';

const ConnectWallet = () => {
  const items = [
    {
      icon: freighterIcon, iconSize: '16', text: 'Freighter', loginMethod: loginTypes.FREIGHTER,
    },
    {
      icon: ledgerIcon, iconSize: '18', text: 'Ledger', loginMethod: loginTypes.LEDGER_S,
    },
    {
      icon: albedoIcon, iconSize: '18', text: 'Albedo', loginMethod: loginTypes.ALBEDO,
    },
    {
      icon: rabetIcon, iconSize: '14', text: 'Rabet', loginMethod: loginTypes.RABET,
    },
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
        <button
          type="button"
          className={styles.btn}
          key={index}
          onClick={() => {
            openModalAction({
              modalProps: {
                back: true,
                backAction: () => {
                  openConnectModal();
                },
              },
              content: <Initializing loginMethod={item.loginMethod} />,
            });
          }}
        >
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
